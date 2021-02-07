import argparse
import os
import pandas as pd
import PIL
import torch

from PIL import Image
from torch.utils.data import Dataset
from torchvision import transforms


class FiraDataset(Dataset):
    def __init__(self, csv_path: str, data_base_path: str):
        self.dataset: pd.core.frame.DataFrame = pd.read_csv(csv_path)
        self.data_base_path: str = data_base_path
        self.train_or_test: str = self.dataset.iloc[0][0]

        if self.train_or_test == "train":
            self.transform = transforms.Compose([
                transforms.Resize((224, 224)),

                # 적은 데이터 셋이라, 학습의 양이 너무 부족하기에, 이를 추가하였습니다. (random noise 대신)
                transforms.ColorJitter(brightness=(0.2, 2), contrast=(0.3, 2), saturation=(0.2, 2), hue=(-0.3, 0.3)),
                transforms.ToTensor(),
                transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                     std=[0.229, 0.224, 0.225])
            ])
        else:
            self.transform = transforms.Compose([
                transforms.Resize((224, 224)),
                transforms.ToTensor(),
                transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                     std=[0.229, 0.224, 0.225])
            ])

    def __len__(self):
        return len(self.dataset)

    def __getitem__(self, index: int) -> [torch.Tensor, torch.Tensor]:
        class_name: str = self.dataset.iloc[index][1]
        image_name: str = self.dataset.iloc[index][2]
        if class_name == "degree_0":
            label: torch.Tensor = torch.tensor(0, dtype=torch.long)
        elif class_name == "degree_90":
            label: torch.Tensor = torch.tensor(1, dtype=torch.long)
        elif class_name == "degree_180":
            label: torch.Tensor = torch.tensor(2, dtype=torch.long)
        elif class_name == "degree_270":
            label: torch.Tensor = torch.tensor(3, dtype=torch.long)
        else:
            raise Exception("UnExpected value come in")
        file_path: str = os.path.join(self.data_base_path, self.train_or_test, class_name, image_name)
        image: PIL.Image.Image = Image.open(file_path)
        image: torch.Tensor = self.transform(image)
        return image, label


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--csv_path', type=str, default="./train.csv")
    parser.add_argument('--data_base_path', type=str, default="./data/after_rotate")
    args = parser.parse_args()

    dataset = FiraDataset(csv_path=args.csv_path, data_base_path=args.data_base_path)
    sample_image, sample_label = dataset[1]
    print(sample_image.size(), sample_label)
