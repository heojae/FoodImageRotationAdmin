import grpc
import sqlalchemy

from typing import List, Tuple

from config import settings
from model import User


async def get_user_list() -> List:
    return await User.list()


async def login_user(email: str, password: str) -> Tuple or sqlalchemy.engine.result.RowProxy:
    return await User.login(email=email, password=password)


async def get_user_detail_by_access_token(access_token: str) -> Tuple or sqlalchemy.engine.result.RowProxy or None:
    return await User.detail_by_access_token(access_token=access_token)


async def is_user_exist_by_access_token(access_token: str) -> Tuple or sqlalchemy.engine.result.RowProxy or None:
    return await User.is_exist_by_access_token(access_token=access_token)


def get_access_token_from_context(context: grpc.ServicerContext) -> str:
    access_token = ""
    for key, value in context.invocation_metadata():
        if key == settings.token_header:
            access_token = value
            break
    return access_token
