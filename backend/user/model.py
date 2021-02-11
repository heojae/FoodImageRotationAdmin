import asyncio
import sqlalchemy

from sqlalchemy import Table, Column, Integer, String
from typing import List, Tuple

from db import metadata, database

users = Table(
    "users",
    metadata,
    Column("pk", Integer, primary_key=True),
    Column("email", String),
    Column("password", String),
    Column("profile_image", String),
    Column("access_token", String),
)


class User:
    @classmethod
    async def list(cls) -> List:
        query = users.select() \
            .with_only_columns([users.c.pk, users.c.email, users.c.profile_image, users.c.access_token]) \
            .order_by(users.c.pk)
        return await database.fetch_all(query)

    @classmethod
    async def detail(cls, pk: int) -> Tuple or sqlalchemy.engine.result.RowProxy:
        query = users.select() \
            .with_only_columns([users.c.pk, users.c.email, users.c.profile_image, users.c.access_token]) \
            .where(users.c.pk == pk)
        return await database.fetch_one(query)

    @classmethod
    async def login(cls, email: str, password: str) -> Tuple or sqlalchemy.engine.result.RowProxy:
        query = users.select() \
            .with_only_columns([users.c.pk, users.c.email, users.c.profile_image, users.c.access_token]) \
            .where(users.c.email == email) \
            .where(users.c.password == password)
        return await database.fetch_one(query)

    @classmethod
    async def detail_by_access_token(cls, access_token: str) -> Tuple or sqlalchemy.engine.result.RowProxy:
        query = users.select() \
            .with_only_columns([users.c.pk, users.c.email, users.c.profile_image, users.c.access_token]) \
            .where(users.c.access_token == access_token)
        user = await database.fetch_one(query)
        return user

    @classmethod
    async def is_exist_by_access_token(cls, access_token: str) -> Tuple or sqlalchemy.engine.result.RowProxy:
        query = users.select() \
            .with_only_columns([users.c.pk]) \
            .where(users.c.access_token == access_token)
        user = await database.fetch_one(query)
        return user


if __name__ == '__main__':
    sample_user_list = asyncio.run(User.list())
    sample_user_detail = asyncio.run(User.detail(pk=1))
    sample_user_login = asyncio.run(User.login(email="admin@naver.com", password="1234"))
    sample_user_detail_by_token = asyncio.run(
        User.detail_by_access_token(access_token="f9e4a020-6bfd-11eb-8572-0800200c9a66"))
    sample_user_is_exist_by_access_token = asyncio.run(
        User.is_exist_by_access_token(access_token="f9e4a020-6bfd-11eb-8572-0800200c9a66"))
