import grpc

from typing import Awaitable, Callable, List, Tuple

from config import settings
from proto import user_pb2_grpc, empty_pb2


class AuthenticateUserAccessToken(grpc.aio.ServerInterceptor):

    def __init__(self, free_pass_method_name_list: List[str]):

        def abort(ignored_request, context: grpc.aio.ServicerContext) -> None:
            context.abort(grpc.StatusCode.UNAUTHENTICATED, 'Invalid signature')

        self._abort_handler = grpc.unary_unary_rpc_method_handler(abort)
        self.free_pass_method_name_list = free_pass_method_name_list

    async def intercept_service(
            self, continuation: Callable[[grpc.HandlerCallDetails], Awaitable[
                grpc.RpcMethodHandler]],
            handler_call_details: grpc.HandlerCallDetails
    ) -> grpc.RpcMethodHandler:

        method_name = handler_call_details.method.split('/')[-1]
        if method_name in self.free_pass_method_name_list:
            return await continuation(handler_call_details)

        for key, value in handler_call_details.invocation_metadata:
            if key == settings.token_header:
                user_authenticated, _ = await authenticate(access_token=value)
                if user_authenticated:
                    return await continuation(handler_call_details)
                break
        return self._abort_handler


async def authenticate(access_token: str) -> Tuple[empty_pb2.Empty or None, str]:
    async with grpc.aio.insecure_channel(settings.user_api_listen_addr) as channel:
        stub: user_pb2_grpc.UserStub = user_pb2_grpc.UserStub(channel)
        metadata = (('access_token', access_token),)
        message = ""
        try:
            response: empty_pb2.Empty = await stub.Authenticate(empty_pb2.Empty(), metadata=metadata)
            return response, message
        except grpc.RpcError as e:
            message = "Invalid Token"
            if grpc.StatusCode.UNAUTHENTICATED == e.code():
                message = e.details()
            return None, message
