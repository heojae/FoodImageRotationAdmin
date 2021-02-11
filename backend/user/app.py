import asyncio
from typing import List

import aioredis
import grpc
import logging
import uvloop

from config import settings
from db import database
from proto import user_pb2, user_pb2_grpc, empty_pb2
from proto.empty_pb2 import Empty
from utils import get_user_list, login_user, get_user_detail_by_access_token, get_access_token_from_context

# ---------------------------- Setup Redis for Global  -------------------------------
# grpc 와 asyncio.run() 의 구조에 맞추어서, 사용하기 위해서, 다음과 같이 global 로 정의하였습니다.
redis: aioredis.commands.Redis or None = None


async def set_redis_default_db_instance(redis: aioredis.commands.Redis):
    await redis.delete('user_access_token')

    user_list = await get_user_list()
    for user in user_list:
        await redis.zadd("user_access_token", score=user.pk, member=user.access_token)


# ----------------------------------------------------------------------------------

class UserServicer(user_pb2_grpc.UserServicer):
    async def Login(self, request: user_pb2.LoginInfo, context: grpc.aio.ServicerContext) -> user_pb2.UserInfo:
        global redis
        print("Login")

        user = await login_user(email=request.email, password=request.password)
        if user:
            return user_pb2.UserInfo(pk=user.pk, email=user.email,
                                     profile_image=user.profile_image, access_token=user.access_token)

        msg = "Invalid email or password had come"
        context.set_details(msg)
        context.set_code(grpc.StatusCode.INVALID_ARGUMENT)
        return None

    async def AuthenticateGetUserInfo(self, request: Empty, context: grpc.aio.ServicerContext) -> user_pb2.UserInfo:
        print("AuthenticateGetUserInfo")

        access_token = get_access_token_from_context(context=context)
        user = await get_user_detail_by_access_token(access_token=access_token)
        if user:
            return user_pb2.UserInfo(pk=user.pk, email=user.email,
                                     profile_image=user.profile_image, access_token=user.access_token)

        msg = "Invalid access_token had come"
        context.set_details(msg)
        context.set_code(grpc.StatusCode.UNAUTHENTICATED)
        return None

    async def Authenticate(self, request: Empty, context: grpc.aio.ServicerContext) -> empty_pb2.Empty:
        global redis
        print("Authenticate")

        access_token = get_access_token_from_context(context=context)
        user_access_token_list: List = await redis.zrange("user_access_token", encoding="utf-8")
        if access_token in user_access_token_list:
            return empty_pb2.Empty()

        msg = "Invalid access_token had come"
        context.set_details(msg)
        context.set_code(grpc.StatusCode.UNAUTHENTICATED)
        return None


async def serve() -> None:
    global redis
    server = grpc.aio.server()
    user_pb2_grpc.add_UserServicer_to_server(UserServicer(), server)
    listen_port = settings.user_api_listen_port
    server.add_insecure_port(listen_port)
    logging.info("Starting server on %s", listen_port)

    await database.connect()
    redis = await aioredis.create_redis_pool(settings.redis_end_point)
    await set_redis_default_db_instance(redis)
    await server.start()
    try:
        await server.wait_for_termination()
    except KeyboardInterrupt:
        redis.close()
        await redis.wait_closed()
        await database.disconnect()
        await server.stop(0)


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)

    asyncio.set_event_loop_policy(uvloop.EventLoopPolicy())
    asyncio.run(serve())
