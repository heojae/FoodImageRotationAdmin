import asyncio
import grpc
import logging

from proto.empty_pb2 import Empty
from typing import List

from config import settings
from proto import model_version_pb2, model_version_pb2_grpc


async def get_using_model() -> model_version_pb2.ModelVersionInfo:
    async with grpc.aio.insecure_channel(settings.model_version_api_listen_port) as channel:
        stub: model_version_pb2_grpc.ModelVersionStub = model_version_pb2_grpc.ModelVersionStub(channel)

        metadata = (('access_token', settings.access_token),)
        response: model_version_pb2.ModelVersionInfo = await stub.GetUsingModelVersion(Empty(), metadata=metadata)
        return response


async def get_model_version_list() -> List[model_version_pb2.ModelVersionInfo]:
    async with grpc.aio.insecure_channel(settings.model_version_api_listen_port) as channel:
        stub: model_version_pb2_grpc.ModelVersionStub = model_version_pb2_grpc.ModelVersionStub(channel)
        metadata = (('access_token', settings.access_token),)

        model_version_list: List[model_version_pb2.ModelVersionInfo] = []
        async for model_version in stub.GetAllModelVersion(Empty(), metadata=metadata):
            model_version_list.append(model_version)
        return model_version_list


async def change(pk: int) -> model_version_pb2.ModelVersionInfo:
    async with grpc.aio.insecure_channel(settings.model_version_api_listen_port) as channel:
        stub = model_version_pb2_grpc.ModelVersionStub(channel)
        metadata = (('access_token', settings.access_token),)

        changed_model_version: model_version_pb2.ModelVersionInfo = \
            await stub.Change(model_version_pb2.SelectedModelVersion(pk=pk), metadata=metadata)

        return changed_model_version


if __name__ == '__main__':
    logging.basicConfig()
    sample_get_using_model = asyncio.run(get_using_model())
    sample_get_model_version_list = asyncio.run(get_model_version_list())
    sample_change = asyncio.run(change(pk=2))
