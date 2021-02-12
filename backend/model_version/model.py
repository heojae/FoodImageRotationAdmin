import asyncio

from typing import List, Tuple
from sqlalchemy import Table, Column, Integer, String, Boolean, Float

from db import metadata, database

model_versions = Table(
    "model_versions",
    metadata,
    Column("pk", Integer, primary_key=True),
    Column("version_name", String),
    Column("train_acc", Float),
    Column("test_acc", Float),
    Column("model_file_name", String),
    Column("is_using", Boolean),
)


class ModelVersion:
    @classmethod
    async def list(cls) -> List:
        query = model_versions.select().order_by(model_versions.c.pk)
        return await database.fetch_all(query)

    @classmethod
    async def detail(cls, pk: int) -> Tuple:
        query = model_versions.select().where(model_versions.c.pk == pk)
        return await database.fetch_one(query)

    @classmethod
    async def get_using_model(cls) -> Tuple:
        query = model_versions.select().where(model_versions.c.is_using)
        return await database.fetch_one(query)

    @classmethod
    async def change_using_model(cls, pk: int) -> None or int:
        check_exist_query = model_versions.select().where(model_versions.c.pk == pk)
        is_exist = await database.fetch_one(check_exist_query)
        if not is_exist:
            return None

        query_now_is_using = model_versions.update().where(model_versions.c.is_using).values(is_using=False)
        query_next_is_using = model_versions.update().where(model_versions.c.pk == pk).values(is_using=True)
        now_is_using_success = await database.execute(query_now_is_using)
        next_is_using_success = await database.execute(query_next_is_using)

        return now_is_using_success and next_is_using_success


if __name__ == '__main__':
    # sample_model_version_list = asyncio.run(ModelVersion.list())

    # sample_model_version_detail = asyncio.run(ModelVersion.detail(pk=1))

    # sample_model_version_is_using = asyncio.run(ModelVersion.get_using_model())

    # please check this with datagrip or anything show database program
    sample_model_version_change_using_model = asyncio.run(ModelVersion.change_using_model(pk=4))
    print(sample_model_version_change_using_model)
