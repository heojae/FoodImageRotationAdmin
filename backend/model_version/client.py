import asyncio
import grpc
import logging

from proto.empty_pb2 import Empty
from typing import List

from config import settings
from proto import model_version_pb2, model_version_pb2_grpc


async def get_using_model() -> model_version_pb2.ModelVersionInfo:
    async with grpc.aio.insecure_channel(settings.model_version_api_listen_addr) as channel:
        stub: model_version_pb2_grpc.ModelVersionStub = model_version_pb2_grpc.ModelVersionStub(channel)

        metadata = (('access_token', settings.access_token),)
        response: model_version_pb2.ModelVersionInfo = await stub.GetUsingModelVersion(Empty(), metadata=metadata)
        return response


async def get_model_version_list() -> List[model_version_pb2.ModelVersionInfo]:
    async with grpc.aio.insecure_channel(settings.model_version_api_listen_addr) as channel:
        stub: model_version_pb2_grpc.ModelVersionStub = model_version_pb2_grpc.ModelVersionStub(channel)
        metadata = (('access_token', settings.access_token),)

        model_version_list: List[model_version_pb2.ModelVersionInfo] = []
        async for model_version in stub.GetAllModelVersion(Empty(), metadata=metadata):
            #    TODO: 위의 방법 이해하고, 이게 왜 되는지 설명을 할 수 있어야 한다. async_generator
            #     해답 참조 링크: https://pypi.org/project/purerpc/
            #     참조 권유: https://hwangheek.github.io/2019/asynchronous-python/
            #             https://www.python.org/dev/peps/pep-0525/
            model_version_list.append(model_version)
        return model_version_list


async def change(pk: int) -> model_version_pb2.ModelVersionInfo:
    async with grpc.aio.insecure_channel(settings.model_version_api_listen_addr) as channel:
        stub = model_version_pb2_grpc.ModelVersionStub(channel)
        metadata = (('access_token', settings.access_token),)

        changed_model_version: model_version_pb2.ModelVersionInfo = \
            await stub.Change(model_version_pb2.SelectedModelVersion(pk=pk), metadata=metadata)

        return changed_model_version


if __name__ == '__main__':
    logging.basicConfig()
    sample_get_using_model = asyncio.run(get_using_model())
    print("sample_get_using_model", sample_get_using_model)
    sample_get_model_version_list = asyncio.run(get_model_version_list())
    print("sample_get_model_version_list", sample_get_model_version_list)
    sample_change = asyncio.run(change(pk=6))
    print("sample_change", sample_change)
