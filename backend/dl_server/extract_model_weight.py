"""
.tar 파일에서, 모델의 파라미터만 뽑아내어, 필요한 부분만 빼낸다.
"""
import argparse
import torch


def extract_model_weight_from_tar_and_save(tar_path: str):
    device = torch.device('cpu')
    pth_path: str = tar_path[:-4]
    checkpoint = torch.load(tar_path, map_location=device)
    torch.save(checkpoint['state_dict'], pth_path)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--tar_path', type=str, default="./weight/single_gpu_b0_bs_32.pth.tar")
    args = parser.parse_args()
    extract_model_weight_from_tar_and_save(tar_path=args.tar_path)
