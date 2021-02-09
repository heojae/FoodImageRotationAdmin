"""
이 파일은 단순히, 이 모델을 사용하는 방법과, 어떠한 과정이 필요한지, 대략 어떠한 값이 나오는 지 정리하기 위한 부분입니다.
올린 모델 또한, 학습데이터가 많은 편이 아니라, 안 되는 경우가 많을 수 있으니, 참고해주세요.
"""
from typing import Tuple

import PIL
import torch
import torch.nn.functional as F
from PIL import ExifTags, Image
from torchvision.transforms import transforms

from model import FiraEfficientNet
from utils import copy_state_dict_for_data_parallel_trained_model

DIRECTION_DICTIONARY = {0: 0, 1: 90, 2: 180, 3: 270}


def inference_image_rotate(model: FiraEfficientNet, image: PIL.Image.Image):
    image, exif_degree = check_exif_data_and_rotate_image(image=image)
    tensor_image: torch.Tensor = transform_pil_image2tensor_image(image=image)  # [1, 3, 224, 224]

    with torch.no_grad():
        output = model(tensor_image)  # [1, 4], inference_time : 0.20484089851379395

    output_softmax = F.softmax(output, dim=1)
    max_value, prediction = torch.max(output_softmax, 1)
    prediction: int = prediction.item()
    confidence: float = max_value.item()
    now_direction: int = DIRECTION_DICTIONARY[prediction]
    return now_direction, confidence, exif_degree


def transform_pil_image2tensor_image(image: PIL.Image.Image) -> torch.Tensor:
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                             std=[0.229, 0.224, 0.225])
    ])
    image: torch.Tensor = transform(image)  # [3, 224, 224]
    image: torch.Tensor = image.unsqueeze(dim=0)  # [1, 3, 224, 224]
    return image


def load_model_weight_from_pth(model: FiraEfficientNet, model_path: str):
    device = torch.device('cpu')
    checkpoint = torch.load(model_path, map_location=device)
    model.load_state_dict(copy_state_dict_for_data_parallel_trained_model(checkpoint))
    return model


def check_exif_data_and_rotate_image(image: PIL.Image.Image) -> Tuple[PIL.Image.Image, int]:
    """
        https://sga8.tistory.com/7
        https://stackoverflow.com/questions/13872331/rotating-an-image-with-orientation-specified-in-exif-using-python-without-pil-in
        i had referenced these sites.
    """
    exif_degree = 0
    orientation = -100

    try:
        for orientation in ExifTags.TAGS.keys():
            if ExifTags.TAGS[orientation] == 'Orientation':
                break
        exif = dict(image._getexif().items())

        if exif[orientation] == 3:
            image = image.rotate(180, expand=True)
            exif_degree = 180
            return image, exif_degree

        elif exif[orientation] == 6:
            image = image.rotate(270, expand=True)
            exif_degree = 270
            return image, exif_degree

        elif exif[orientation] == 8:
            image = image.rotate(90, expand=True)
            exif_degree = 90
            return image, exif_degree

        elif exif[orientation] == 1:
            exif_degree = 0

    except (AttributeError, KeyError, IndexError):
        # cases: image don't have getexif
        exif_degree = 0

    return image, exif_degree


if __name__ == '__main__':
    model = FiraEfficientNet(first_train=False)
    model = load_model_weight_from_pth(model, model_path="./weight/single_gpu_b0_bs_32.pth")
    model.eval()

    sample_image: PIL.Image.Image = Image.open("./sample/sample2.jpg")
    now_direction, confidence, exif_degree = inference_image_rotate(model=model, image=sample_image)
    need_rotate_degree = 360 - now_direction
    print("현재 각도 : {} , 수정 필요 각도 : {}, confidence : {} , exif_degree : {}".format(now_direction, need_rotate_degree,
                                                                                  confidence, exif_degree))
