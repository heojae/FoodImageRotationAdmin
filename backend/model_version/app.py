import asyncio
import grpc
import logging
import signal
import uvloop

from proto.empty_pb2 import Empty
from typing import Iterator

from authenticate import AuthenticateUserAccessToken
from config import settings
from db import database
from proto import model_version_pb2, model_version_pb2_grpc
from utils import get_using_model_version, get_model_version_list, change_using_model_version, \
    load_model_in_dl_api, get_access_token_from_context

# ---------------------------- Setup Grpc Server for Global  -------------------------------
server: grpc.Server


# ----------------------------------------------------------------------------------

class ModelVersionServicer(model_version_pb2_grpc.ModelVersionServicer):
    async def GetUsingModelVersion(self, request: Empty,
                                   context: grpc.aio.ServicerContext) -> model_version_pb2.ModelVersionInfo:
        print("get using model", flush=True)
        model_version = await get_using_model_version()
        return model_version_pb2.ModelVersionInfo(pk=model_version.pk, version_name=model_version.version_name,
                                                  train_acc=model_version.train_acc, test_acc=model_version.test_acc,
                                                  model_file_name=model_version.model_file_name,
                                                  is_using=model_version.is_using)

    async def GetAllModelVersion(self, request: Empty, context: grpc.aio.ServicerContext) \
            -> Iterator[model_version_pb2.ModelVersionInfo]:
        print("get list", flush=True)
        model_version_list = await get_model_version_list()

        for model_version in model_version_list:
            yield model_version_pb2.ModelVersionInfo(pk=model_version.pk, version_name=model_version.version_name,
                                                     train_acc=model_version.train_acc, test_acc=model_version.test_acc,
                                                     model_file_name=model_version.model_file_name,
                                                     is_using=model_version.is_using)

    async def Change(self, request: model_version_pb2.SelectedModelVersion, context: grpc.aio.ServicerContext) \
            -> model_version_pb2.ModelVersionInfo:
        print("change", flush=True)
        access_token = get_access_token_from_context(context=context)

        is_success = await change_using_model_version(pk=request.pk)
        if not is_success:
            msg = "Invalid model version pk come"
            context.set_details(msg)
            context.set_code(grpc.StatusCode.INVALID_ARGUMENT)
            return Empty()

        model_version = await get_using_model_version()
        response, error_message = await load_model_in_dl_api(path=model_version.model_file_name,
                                                             access_token=access_token)
        if not response:
            msg = "Change using model version in db, But could not change model in dl server"
            context.set_details(msg)
            context.set_code(grpc.StatusCode.ABORTED)
            return Empty()
        return Empty()


async def serve() -> None:
    global server

    server = grpc.aio.server(interceptors=(AuthenticateUserAccessToken(free_pass_method_name_list=[]),))
    model_version_pb2_grpc.add_ModelVersionServicer_to_server(ModelVersionServicer(), server)
    listen_port = settings.model_version_api_listen_port
    server.add_insecure_port(listen_port)
    logging.info("Starting server on %s", listen_port)

    await database.connect()
    await server.start()
    await server.wait_for_termination()


async def shut_down_server(signal: signal.Signals, loop) -> None:
    global server

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
