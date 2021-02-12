import asyncio
import base64
import grpc
import logging
import PIL

from proto.empty_pb2 import Empty
from io import BytesIO
from PIL import Image
from typing import List

from config import settings
from proto import dataset_pb2, dataset_pb2_grpc
from proto import user_fix_image_pb2, user_fix_image_pb2_grpc


async def get_dataset_info_list() -> List[dataset_pb2.DatasetInfo]:
    async with grpc.aio.insecure_channel(settings.dataset_api_listen_addr) as channel:
        stub: dataset_pb2_grpc.DatasetStub = dataset_pb2_grpc.DatasetStub(channel)
        metadata = (('access_token', settings.access_token),)

        dataset_info_list: List[dataset_pb2.DatasetInfo] = []
        async for dataset_info in stub.GetDatasetInfoList(Empty(), metadata=metadata):
            dataset_info_list.append(dataset_info)
        return dataset_info_list


async def get_image_info_list() -> List[dataset_pb2.ImageInfo]:
    async with grpc.aio.insecure_channel(settings.dataset_api_listen_addr) as channel:
        stub: dataset_pb2_grpc.DatasetStub = dataset_pb2_grpc.DatasetStub(channel)
        metadata = (('access_token', settings.access_token),)

        image_info_list: List[dataset_pb2.ImageInfo] = []
        async for image_info in stub.GetImageInfoList(Empty(), metadata=metadata):
            image_info_list.append(image_info)
        return image_info_list


async def get_choose_image_info_list(dataset_info_pk: int) -> List[dataset_pb2.ImageInfo]:
    async with grpc.aio.insecure_channel(settings.dataset_api_listen_addr) as channel:
        stub: dataset_pb2_grpc.DatasetStub = dataset_pb2_grpc.DatasetStub(channel)
        metadata = (('access_token', settings.access_token),)

        image_info_list: List[dataset_pb2.ImageInfo] = []
        async for image_info in stub.GetChooseImageInfoList(
                dataset_pb2.SelectedDatasetInfo(dataset_info_pk=dataset_info_pk), metadata=metadata):
            image_info_list.append(image_info)
        return image_info_list


async def create_dataset_info(title: str) -> Empty:
    async with grpc.aio.insecure_channel(settings.dataset_api_listen_addr) as channel:
        stub: dataset_pb2_grpc.DatasetStub = dataset_pb2_grpc.DatasetStub(channel)
        metadata = (('access_token', settings.access_token),)
        response: Empty = await stub.CreateDatasetInfo(
            dataset_pb2.NewDatasetInfo(title=title), metadata=metadata
        )
        return response


async def remove_image(pk: int) -> Empty:
    async with grpc.aio.insecure_channel(settings.dataset_api_listen_addr) as channel:
        stub: dataset_pb2_grpc.DatasetStub = dataset_pb2_grpc.DatasetStub(channel)
        metadata = (('access_token', settings.access_token),)
        response: Empty = await stub.RemoveImage(
            dataset_pb2.SelectedImageInfo(image_info_pk=pk), metadata=metadata
        )
        return response


async def save_user_fix_image(image: PIL.Image.Image) -> Empty:
    async with grpc.aio.insecure_channel(settings.dataset_api_listen_addr) as channel:
        image_file: BytesIO = BytesIO()
        image.save(image_file, format="PNG")
        image_bytes: bytes = image_file.getvalue()
        b64image: str = base64.b64encode(image_bytes)

        stub: user_fix_image_pb2_grpc.UserFixImageStub = user_fix_image_pb2_grpc.UserFixImageStub(channel)
        metadata = (('access_token', settings.access_token),)
        response: Empty = await stub.SaveUserFixImage(
            user_fix_image_pb2.UserFixedImageInfo(image_content=image_bytes, file_name="ccc.jpg", exif_degree=90,
                                                  model_degree=180, confidence=0.87, user_fix_degree=270),
            metadata=metadata
        )
        return response


if __name__ == '__main__':
    logging.basicConfig()

    sample_get_dataset_info_list = asyncio.run(get_dataset_info_list())
    sample_get_image_info_list = asyncio.run(get_image_info_list())
    sample_get_choose_info_list = asyncio.run(get_choose_image_info_list(dataset_info_pk=1))
    sample_create_dataset_info = asyncio.run(create_dataset_info(title="sample_dataset2"))
    # sample_remove_image = asyncio.run(remove_image(pk=2))

    # image: PIL.Image.Image = Image.new('RGB', (224, 224), (127, 127, 127))
    # sample_save_user_fix_image = asyncio.run(save_user_fix_image(image=image))
