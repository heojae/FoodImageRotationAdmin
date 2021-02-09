import argparse
import os
import time
import torch
import torch.nn as nn

from torch import optim
from torch.backends import cudnn
from torch.utils import data

from dataset import FiraDataset
from model import FiraEfficientNet
from utils import AverageMeter, ProgressMeter, accuracy, adjust_learning_rate, \
    add_module_to_state_dict_for_data_parallel_trained_model

global best_acc1


def main(args: argparse.Namespace):
    global best_acc1
    best_acc1 = 0

    os.environ["CUDA_VISIBLE_DEVICES"] = args.gpu

    if torch.cuda.device_count() < 2:
        raise Exception("Please run other example, train_cpu_only or train_single_gpu")

    os.makedirs(args.save_model_dir, exist_ok=True)

    model = FiraEfficientNet(first_train=True) if not args.resume else FiraEfficientNet(first_train=False)
    model = nn.DataParallel(model)
    model.cuda()

    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=args.lr)

    if args.resume:
        checkpoint = torch.load(args.resume)
        args.start_epoch = checkpoint["epoch"]
        best_acc1 = checkpoint["best_acc1"]

        model.load_state_dict(add_module_to_state_dict_for_data_parallel_trained_model(checkpoint['state_dict']))
        optimizer.load_state_dict(checkpoint['optimizer'])

    train_dataset = FiraDataset(csv_path=args.train_csv_path, data_base_path=args.data_set_base_path)
    val_dataset = FiraDataset(csv_path=args.test_csv_path, data_base_path=args.data_set_base_path)
    train_loader = data.DataLoader(train_dataset, batch_size=args.batch_size, num_workers=args.num_workers,
                                   shuffle=args.shuffle, pin_memory=args.pin_memory)
    val_loader = data.DataLoader(val_dataset, batch_size=args.batch_size, num_workers=args.num_workers,
                                 shuffle=False, pin_memory=args.pin_memory)

    for epoch in range(args.start_epoch, args.epochs):
        adjust_learning_rate(optimizer, epoch, args)
        train(train_loader, model, criterion, optimizer, epoch, args)
        acc1 = validate(val_loader, model, criterion, args)

        is_best = acc1 > best_acc1
        best_acc1 = max(acc1, best_acc1)

        if is_best:
            state = {
                'epoch': epoch + 1,
                'state_dict': model.state_dict(),
                'best_acc1': best_acc1,
                'optimizer': optimizer.state_dict(),
            }
            torch.save(state, os.path.join(args.save_model_dir, args.save_model_file_name))


def train(train_loader, model, criterion, optimizer, epoch, args):
    batch_time = AverageMeter('Time', ':6.3f')
    data_time = AverageMeter('Data', ':6.3f')
    losses = AverageMeter('Loss', ':.4e')
    top1 = AverageMeter('Acc@1', ':6.2f')
    progress = ProgressMeter(
        len(train_loader),
        [batch_time, data_time, losses, top1],
        prefix="Epoch: [{}]".format(epoch))

    model.train()

    end = time.time()
    for i, (inputs, targets) in enumerate(train_loader):
        inputs, targets = inputs.cuda(), targets.cuda()
        outputs = model(inputs)
        loss = criterion(outputs, targets)
        temp_batch_size = inputs.size(0)

        acc1 = accuracy(outputs, targets, topk=(1,))
        losses.update(loss.item(), temp_batch_size)
        top1.update(acc1[0].item(), temp_batch_size)

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        batch_time.update(time.time() - end)
        end = time.time()

        if i % args.print_freq == 0:
            progress.display(i)


def validate(val_loader, model, criterion, args):
    batch_time = AverageMeter('Time', ':6.3f')
    losses = AverageMeter('Loss', ':.4e')
    top1 = AverageMeter('Acc@1', ':6.2f')
    progress = ProgressMeter(
        len(val_loader),
        [batch_time, losses, top1],
        prefix='Test: ')

    model.eval()

    with torch.no_grad():
        end = time.time()
        for i, (inputs, targets) in enumerate(val_loader):
            inputs, targets = inputs.cuda(), targets.cuda()
            outputs = model(inputs)
            loss = criterion(outputs, targets)

            temp_batch_size = inputs.size(0)

            acc1 = accuracy(outputs, targets, topk=(1,))
            losses.update(loss.item(), temp_batch_size)
            top1.update(acc1[0].item(), temp_batch_size)

            # measure elapsed time
            batch_time.update(time.time() - end)
            end = time.time()
            if i % args.print_freq == 0:
                progress.display(i)

        print(' * Acc@1 {top1.avg:.3f}'
              .format(top1=top1))
    return top1.avg


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--data_set_base_path', type=str,
                        default="./data/after_rotate",
                        help='the path of base data set is located')
    parser.add_argument('--train_csv_path', type=str, default="./train.csv", help='train.csv path')
    parser.add_argument('--test_csv_path', type=str, default="./test.csv", help='test.csv path')

    # use gpu or not
    parser.add_argument('--cuda', type=bool, default=True)
    parser.add_argument('--gpu', type=str, default="0, 1")

    # model load ans save value
    parser.add_argument('--resume', default='', type=str, metavar='PATH',
                        # ./weight/data_parallel_b0_bs_96.pth.tar
                        help='path to latest checkpoint (default: none)')
    parser.add_argument('--save_model_dir', default='./weight', type=str, metavar='PATH',
                        help='path to latest checkpoint (default: none)')
    parser.add_argument('--save_model_file_name', type=str, default="data_parallel_b0_bs_96.pth.tar")

    # model train parameter
    parser.add_argument('--batch_size', type=int, default=96)
    parser.add_argument('--pin_memory', type=bool, default=True)
    parser.add_argument('--shuffle', type=bool, default=True)
    parser.add_argument('--lr', type=float, default=1e-4)
    parser.add_argument('--num_workers', type=int, default=1)

    # epoch
    parser.add_argument('--start_epoch', default=0, type=int, metavar='N',
                        help='manual epoch number (useful on restarts)')
    parser.add_argument('--epochs', default=20, type=int, metavar='N',
                        help='number of total epochs to run')

    # distributed data parallel related value
    parser.add_argument('--world_size', default=1, type=int,
                        help='number of nodes for distributed training')
    parser.add_argument('--rank', default=0, type=int,
                        help='node rank for distributed training')
    parser.add_argument('--dist_url', default='tcp://127.0.0.1:8085', type=str,
                        help='url used to set up distributed training')
    parser.add_argument('--dist_backend', default='nccl', type=str,
                        help='distributed backend')
    # Apex
    parser.add_argument('--opt_level', default='O2', type=str)

    # ETC
    parser.add_argument('--print_freq', default=10, type=int)

    args = parser.parse_args()

    cudnn.benchmark = True
    cudnn.deterministic = True

    main(args)
