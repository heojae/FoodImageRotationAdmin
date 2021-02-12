import base64
import grpc
import PIL

from config import settings
from google.protobuf.empty_pb2 import Empty
from io import BytesIO
from PIL import Image, ExifTags
from typing import Tuple

from proto import model_version_pb2, model_version_pb2_grpc


def get_using_model_version_info() -> model_version_pb2.ModelVersionInfo:
    with grpc.insecure_channel(settings.model_version_api_listen_addr) as channel:
        stub: model_version_pb2_grpc.ModelVersionStub = model_version_pb2_grpc.ModelVersionStub(channel)

        metadata = (('access_token', settings.access_token),)
        model_version_info: model_version_pb2.ModelVersionInfo = stub.GetUsingModelVersion(Empty(), metadata=metadata)
        return model_version_info


def convert_b64image2pil_image(b64image: str) -> PIL.Image.Image:
    image_bytes: bytes = base64.b64decode(b64image)
    image_file: BytesIO = BytesIO(image_bytes)

    image: PIL.Image.Image = Image.open(image_file)
    return image


def save_convert_b64image2pil_image(b64image: str, save_file_name="check.jpg") -> None:
    image_bytes: bytes = base64.b64decode(b64image)
    image_file: BytesIO = BytesIO(image_bytes)

    with open(save_file_name, "wb") as f:
        f.write(image_file.getbuffer())


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
