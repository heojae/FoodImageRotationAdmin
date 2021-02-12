import asyncio
import grpc
import logging
import os
import uuid
import uvloop

from aiofile import async_open
from aioify import aioify
from proto.empty_pb2 import Empty
from io import BytesIO

from authenticate import AuthenticateUserAccessToken
from config import settings
from proto import dataset_pb2, dataset_pb2_grpc
from proto import user_fix_image_pb2, user_fix_image_pb2_grpc
from utils import get_dataset_info_list, get_image_info_list, get_choose_image_info_list, \
    convert_b64image2bytes_io, get_last_dataset_info, insert_image_info, update_dataset_info, insert_dataset_info, \
    delete_image_info


class DatasetServicer(dataset_pb2_grpc.DatasetServicer):
    async def GetDatasetInfoList(self, request, context):
        print("GetDatasetInfoList")
        dataset_info_list = await get_dataset_info_list()
        for dataset_info in dataset_info_list:
            yield dataset_pb2.DatasetInfo(pk=dataset_info.pk, title=dataset_info.title)

    async def GetImageInfoList(self, request, context):
        print("GetImageInfoList")

    async def GetChooseImageInfoList(self, request, context):
        print("GetChooseImageInfoList")
        print("request.dataset_info_pk : ", request.dataset_info_pk)

    async def CreateDatasetInfo(self, request, context):
        print("CreateDatasetInfo")

    async def RemoveImage(self, request, context):
        print("RemoveImage")


class UserFixImageServicer(user_fix_image_pb2_grpc.UserFixImageServicer):
    async def SaveUserFixImage(self, request, context):
        print("SaveUserFixImage")


async def serve() -> None:
    server = grpc.aio.server(interceptors=(AuthenticateUserAccessToken(free_pass_method_name_list=[]),))
    dataset_pb2_grpc.add_DatasetServicer_to_server(DatasetServicer(), server)
    user_fix_image_pb2_grpc.add_UserFixImageServicer_to_server(UserFixImageServicer(), server)
    listen_port = settings.dataset_api_listen_port
    server.add_insecure_port(listen_port)
    logging.info("Starting server on %s", listen_port)
    await server.start()
    try:
        await server.wait_for_termination()
    except KeyboardInterrupt:
        await server.stop(0)


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)

    asyncio.set_event_loop_policy(uvloop.EventLoopPolicy())
    asyncio.run(serve())
