import asyncio
import grpc
import logging

from typing import Tuple

from config import settings
from proto import user_pb2, user_pb2_grpc, empty_pb2
from proto.empty_pb2 import Empty


async def login() -> user_pb2.UserInfo or None:
    async with grpc.aio.insecure_channel(settings.user_api_listen_port) as channel:
        stub: user_pb2_grpc.UserStub = user_pb2_grpc.UserStub(channel)

        try:
            response: user_pb2.UserInfo = await stub.Login(
                user_pb2.LoginInfo(email="admin@naver.com", password="1234"))
            return response
        except grpc.RpcError as e:
            print(e)
            if grpc.StatusCode.INVALID_ARGUMENT == e.code():
                # TODO : you input invalid email or password, so make new code for this case
                print(e.details())
                pass
            return


async def authenticate_get_user_info(access_token: str) -> Tuple[empty_pb2.Empty or None, str]:
    async with grpc.aio.insecure_channel(settings.user_api_listen_port) as channel:
        stub: user_pb2_grpc.UserStub = user_pb2_grpc.UserStub(channel)
        metadata = (('access_token', access_token),)
        try:
            response: user_pb2.UserInfo = await stub.AuthenticateGetUserInfo(Empty(), metadata=metadata)
            return response
        except grpc.RpcError as e:
            print(e)
            message = "Error Happen: " + str(e)
            if grpc.StatusCode.UNAUTHENTICATED == e.code():
                message = e.details()
            return message


async def authenticate(access_token: str) -> Tuple[empty_pb2.Empty or None, str]:
    async with grpc.aio.insecure_channel(settings.user_api_listen_port) as channel:
        stub: user_pb2_grpc.UserStub = user_pb2_grpc.UserStub(channel)
        metadata = (('access_token', access_token),)
        try:
            response: empty_pb2.Empty = await stub.Authenticate(Empty(), metadata=metadata)
            return response
        except grpc.RpcError as e:
            print(e)
            message = "Error Happen: " + str(e)
            if grpc.StatusCode.UNAUTHENTICATED == e.code():
                message = e.details()
            return message


if __name__ == '__main__':
    logging.basicConfig()

    sample_login = asyncio.run(login())
    sample_authenticate_get_user_info = asyncio.run(authenticate_get_user_info(access_token=settings.access_token))
    sample_authenticate = asyncio.run(authenticate(access_token=settings.access_token))
