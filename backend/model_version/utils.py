import grpc

from typing import List, Tuple
from google.protobuf.empty_pb2 import Empty

from config import settings
from model import ModelVersion
from proto import inference_pb2, inference_pb2_grpc


async def get_using_model_version():
    return await ModelVersion.get_using_model()


async def get_model_version_list() -> List:
    return await ModelVersion.list()


async def change_using_model_version(pk: int) -> None:
    return await ModelVersion.change_using_model(pk=pk)


async def load_model_in_dl_api(path: str, access_token) -> Tuple[Empty or None, str]:
    async with grpc.aio.insecure_channel(settings.dl_api_listen_addr) as channel:
        stub: inference_pb2_grpc.InferenceFoodImageStub = inference_pb2_grpc.InferenceFoodImageStub(channel)
        metadata = (('access_token', access_token),)
        error_message = ""
        try:
            response: Empty = await stub.LoadModel(inference_pb2.ModelPath(path=path), metadata=metadata)
            return response, error_message
        except grpc.RpcError as e:
            if grpc.StatusCode.INVALID_ARGUMENT == e.code():
                error_message = "Invalid Argument has come"
            elif grpc.StatusCode.UNAVAILABLE == e.code():
                error_message = "api_dl server is not open"

            return None, error_message


def get_access_token_from_context(context: grpc.ServicerContext) -> str:
    access_token = ""
    for key, value in context.invocation_metadata():
        if key == settings.token_header:
            access_token = value
            break
    return access_token
