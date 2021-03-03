import asyncio
import signal
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

# ---------------------------- Setup Redis and Grpc Server for Global  -------------------------------
redis: aioredis.commands.Redis
server: grpc.Server


async def set_redis_default_db_instance(redis: aioredis.commands.Redis):
    await redis.delete('user_access_token')

    user_list = await get_user_list()
    for user in user_list:
        await redis.zadd("user_access_token", score=user.pk, member=user.access_token)


# ----------------------------------------------------------------------------------

class UserServicer(user_pb2_grpc.UserServicer):
    async def Login(self, request: user_pb2.LoginInfo, context: grpc.aio.ServicerContext) -> user_pb2.UserInfo:
        global redis
        print("Login", flush=True)

        user = await login_user(email=request.email, password=request.password)
        if user:
            return user_pb2.UserInfo(pk=user.pk, email=user.email,
                                     profile_image=user.profile_image, access_token=user.access_token)

        msg = "Invalid email or password come"
        context.set_details(msg)
        context.set_code(grpc.StatusCode.INVALID_ARGUMENT)
        return user_pb2.UserInfo()

    async def AuthenticateGetUserInfo(self, request: Empty, context: grpc.aio.ServicerContext) -> user_pb2.UserInfo:
        print("AuthenticateGetUserInfo", flush=True)

        access_token = get_access_token_from_context(context=context)
        user = await get_user_detail_by_access_token(access_token=access_token)
        if user:
            return user_pb2.UserInfo(pk=user.pk, email=user.email,
                                     profile_image=user.profile_image, access_token=user.access_token)

        msg = "Invalid access_token come"
        context.set_details(msg)
        context.set_code(grpc.StatusCode.UNAUTHENTICATED)
        return user_pb2.UserInfo()

    async def Authenticate(self, request: Empty, context: grpc.aio.ServicerContext) -> empty_pb2.Empty:
        global redis
        print("Authenticate", flush=True)

        access_token = get_access_token_from_context(context=context)
        user_access_token_list: List = await redis.zrange("user_access_token", encoding="utf-8")
        if access_token in user_access_token_list:
            return empty_pb2.Empty()

        msg = "Invalid access_token come"
        context.set_details(msg)
        context.set_code(grpc.StatusCode.UNAUTHENTICATED)
        return empty_pb2.Empty()


async def serve() -> None:
    global redis, server

    server = grpc.aio.server()
    user_pb2_grpc.add_UserServicer_to_server(UserServicer(), server)
    listen_port = settings.user_api_listen_port
    server.add_insecure_port(listen_port)
    logging.info("Starting server on %s", listen_port)

    await database.connect()
    redis = await aioredis.create_redis_pool(settings.redis_end_point)
    await set_redis_default_db_instance(redis)

    await server.start()
    await server.wait_for_termination()


async def shut_down_server(signal: signal.Signals, loop) -> None:
    global redis, server

    redis.close()
    await redis.wait_closed()  # Coroutine waiting until underlying connections are closed.
    await database.disconnect()
    await server.stop(0)

    loop.stop()


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)

    asyncio.set_event_loop_policy(uvloop.EventLoopPolicy())
    loop = asyncio.get_event_loop()

    signals = (signal.SIGHUP, signal.SIGTERM, signal.SIGINT)
    for s in signals:
        loop.add_signal_handler(s, lambda s=s: asyncio.create_task(shut_down_server(s, loop)))

    try:
        loop.run_until_complete(serve())
    finally:
        loop.close()
