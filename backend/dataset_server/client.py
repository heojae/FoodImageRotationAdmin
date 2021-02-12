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


if __name__ == '__main__':
    logging.basicConfig()

    sample_get_dataset_info_list = asyncio.run(get_dataset_info_list())
    print(sample_get_dataset_info_list)
