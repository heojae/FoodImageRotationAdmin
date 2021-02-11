import grpc
import sqlalchemy

from typing import List, Tuple

from config import settings
from model import User


async def get_user_list() -> List:
    return await User.list()


async def get_user_detail(pk: int) -> Tuple or sqlalchemy.engine.result.RowProxy:
    return await User.detail(pk=pk)


async def login_user(email: str, password: str) -> Tuple or sqlalchemy.engine.result.RowProxy:
    return await User.login(email=email, password=password)


async def get_user_detail_by_access_token(access_token: str) -> Tuple or sqlalchemy.engine.result.RowProxy or None:
    return await User.detail_by_access_token(access_token=access_token)


async def is_user_exist_by_access_token(access_token: str) -> Tuple or sqlalchemy.engine.result.RowProxy or None:
    return await User.is_exist_by_access_token(access_token=access_token)



