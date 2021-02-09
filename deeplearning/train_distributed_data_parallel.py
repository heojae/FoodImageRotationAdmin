import argparse
import os
import time
import torch
import torch.distributed as dist
import torch.nn as nn
import torch.multiprocessing as mp

from torch import optim
from torch.backends import cudnn
from torch.utils import data

from dataset import FiraDataset
from model import FiraEfficientNet
from utils import AverageMeter, ProgressMeter, accuracy, adjust_learning_rate, \
    copy_state_dict_for_data_parallel_trained_model

global best_acc1


def main(args: argparse.Namespace):
    os.environ["CUDA_VISIBLE_DEVICES"] = args.gpu

    ngpus_per_node = torch.cuda.device_count()
    if ngpus_per_node <= 1:
        raise Exception("if you don't have multi gpus, run other(=train_single_gpu.py)")

    args.world_size = ngpus_per_node * args.world_size
    mp.spawn(main_worker, nprocs=ngpus_per_node, args=(ngpus_per_node, args))


def main_worker(gpu, ngpus_per_node, args):
    global best_acc1
    best_acc1 = 0
    args.gpu = gpu
    args.rank = gpu
    args.batch_size = int(args.batch_size / ngpus_per_node)

    dist.init_process_group(backend=args.dist_backend, init_method=args.dist_url,
                            world_size=args.world_size, rank=args.rank)
    torch.cuda.set_device(args.gpu)

    model = FiraEfficientNet(first_train=True) if not args.resume else FiraEfficientNet(first_train=False)
    model.cuda(args.gpu)

    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=args.lr)

    if args.resume:
        loc = 'cuda:{}'.format(args.gpu)
        checkpoint = torch.load(args.resume, map_location=loc)
        args.start_epoch = checkpoint["epoch"]
        best_acc1 = checkpoint["best_acc1"]

        model.load_state_dict(copy_state_dict_for_data_parallel_trained_model(checkpoint['state_dict']))
        optimizer.load_state_dict(checkpoint['optimizer'])

    train_dataset = FiraDataset(csv_path=args.train_csv_path, data_base_path=args.data_set_base_path)
    val_dataset = FiraDataset(csv_path=args.test_csv_path, data_base_path=args.data_set_base_path)

    train_sampler = torch.utils.data.distributed.DistributedSampler(train_dataset)
    val_sampler = torch.utils.data.distributed.DistributedSampler(val_dataset)

    train_loader = data.DataLoader(train_dataset, batch_size=args.batch_size, shuffle=False,
                                   pin_memory=True, sampler=train_sampler)
    val_loader = data.DataLoader(val_dataset, batch_size=args.batch_size, shuffle=False,
                                 pin_memory=True, sampler=val_sampler)

    for epoch in range(args.start_epoch, args.epochs):
        adjust_learning_rate(optimizer, epoch, args)
        train(train_loader, model, criterion, optimizer, epoch, args)
        acc1 = validate(val_loader, model, criterion, args)

        is_best = acc1 > best_acc1
        best_acc1 = max(acc1, best_acc1)

        if is_best and args.rank % ngpus_per_node == 0:
            state = {
                'epoch': epoch + 1,
                'state_dict': model.state_dict(),
                'best_acc1': best_acc1,
                'optimizer': optimizer.state_dict(),
            }
            torch.save(state, os.path.join(args.save_model_dir, args.save_model_file_name))
            print(os.path.join(args.save_model_dir, args.save_model_file_name) + "model is saved")


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
        inputs, targets = inputs.cuda(args.gpu), targets.cuda(args.gpu)
        outputs = model(inputs)
        loss = criterion(outputs, targets)

        acc1 = accuracy(outputs, targets, topk=(1,))
        losses.update(loss.item(), inputs.size(0))
        top1.update(acc1[0].item(), inputs.size(0))

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
            inputs, targets = inputs.cuda(args.gpu), targets.cuda(args.gpu)
            outputs = model(inputs)
            loss = criterion(outputs, targets)

            acc1 = accuracy(outputs, targets, topk=(1,))
            losses.update(loss.item(), inputs.size(0))
            top1.update(acc1[0].item(), inputs.size(0))

            # measure elapsed time
            batch_time.update(time.time() - end)
            end = time.time()
            if i % args.print_freq == 0:
                progress.display(i)
        if args.rank == 0:
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
    parser.add_argument('--gpu', type=str, default="0, 1, 2")

    # model load ans save value
    parser.add_argument('--resume', default='', type=str, metavar='PATH',
                        # ./weight/distributed_data_parallel_b0_bs_96.pth.tar
                        help='path to latest checkpoint (default: none)')
    parser.add_argument('--save_model_dir', default='./weight', type=str, metavar='PATH',
                        help='path to latest checkpoint (default: none)')
    parser.add_argument('--save_model_file_name', type=str, default="distributed_data_parallel_b0_bs_96.pth.tar")

    # model train parameter
    parser.add_argument('--batch_size', type=int, default=96)
    parser.add_argument('--pin_memory', type=bool, default=True)
    parser.add_argument('--shuffle', type=bool, default=True)
    parser.add_argument('--lr', type=float, default=1e-4)
    parser.add_argument('--num_workers', type=int, default=1)

    # epoch
    parser.add_argument('--start-epoch', default=0, type=int, metavar='N',
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
    parser.add_argument('--print_freq', default=5, type=int)

    args = parser.parse_args()

    cudnn.benchmark = True
    cudnn.deterministic = True

    main(args)
