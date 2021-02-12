import os
import collections
import torch
import torch.nn.functional as F
import PIL

from collections import OrderedDict
from torchvision.transforms import transforms
from typing import Tuple

from dl_model import FiraEfficientNet

DIRECTION_DICTIONARY = {0: 0, 1: 90, 2: 180, 3: 270}


def copy_state_dict_for_data_parallel_trained_model(state_dict: collections.OrderedDict):
    """
        clova ai deep-text-recognition-benchmark 레포에 있는 copyStateDict 에서 들고와 변형한 코드입니다.
        data-parallel 인 상태에서, 저장할 경우, 파라미터들 key 값에 module 이 붙어 있게 되는데,
        model 을 load 할 때, 그것을 해결하기 위해서 사용합니다.
    """
    if list(state_dict.keys())[0].startswith("module"):
        start_idx = 1
    else:
        start_idx = 0
    new_state_dict = OrderedDict()
    for k, v in state_dict.items():
        name = ".".join(k.split(".")[start_idx:])
        new_state_dict[name] = v
    return new_state_dict


def load_model_weight_from_tar(model: FiraEfficientNet, tar_file_name: str):
    device = torch.device('cpu')
    tar_path = os.path.join("./weight", tar_file_name)
    checkpoint = torch.load(tar_path, map_location=device)
    model.load_state_dict(copy_state_dict_for_data_parallel_trained_model(checkpoint['state_dict']))
    return model


def load_model_weight_from_pth(model: FiraEfficientNet, model_file_name: str):
    device = torch.device('cpu')
    model_path = os.path.join("./weight", model_file_name)
    checkpoint = torch.load(model_path, map_location=device)
    model.load_state_dict(copy_state_dict_for_data_parallel_trained_model(checkpoint))
    return model


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


def inference_image(model: FiraEfficientNet, image: PIL.Image.Image) -> Tuple[int, float]:
    tensor_image: torch.Tensor = transform_pil_image2tensor_image(image=image)  # [1, 3, 224, 224]

    with torch.no_grad():
        output = model(tensor_image)  # [1, 4], inference_time : 0.20484089851379395

    output_softmax = F.softmax(output, dim=1)
    max_value, prediction = torch.max(output_softmax, 1)
    prediction: int = prediction.item()
    confidence: float = max_value.item()
    now_direction: int = DIRECTION_DICTIONARY[prediction]
    return now_direction, confidence
