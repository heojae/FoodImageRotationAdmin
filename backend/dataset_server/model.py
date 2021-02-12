import asyncio

from sqlalchemy import Table, Column, Integer, String, Float, ForeignKey
from typing import List, Tuple, Dict

from db import metadata, database

dataset_info = Table(
    "dataset_info",
    metadata,
    Column("pk", Integer, primary_key=True),
    Column("title", String),
)

image_info = Table(
    "image_info",
    metadata,
    Column("pk", Integer, primary_key=True),
    Column("dataset_info_pk", Integer, ForeignKey("dataset_info.pk")),

    Column("original_file_name", String),
    Column("uuid_file_name", String),
    Column("exif_degree", Integer),
    Column("model_degree", Integer),
    Column("confidence", Float),
    Column("user_fix_degree", Integer),
)


class DatasetInfo:
    @classmethod
    async def insert(cls, title="untrained") -> int:
        query = dataset_info.insert().values(title=title)
        return await database.execute(query)

    @classmethod
    async def list(cls) -> List:
        query = dataset_info.select().order_by(dataset_info.c.pk)
        return await database.fetch_all(query)

    @classmethod
    async def detail(cls, pk: int) -> Tuple:
        query = dataset_info.select().where(dataset_info.c.pk == pk)
        return await database.fetch_one(query)

    @classmethod
    async def get_image_list(cls, pk: int) -> List:
        query = image_info.select().where(image_info.c.dataset_info_pk == pk)
        return await database.fetch_all(query)

    @classmethod
    async def get_last_dataset_info(cls) -> Tuple:
        query = dataset_info.select().order_by(-dataset_info.c.pk).limit(1)
        return await database.fetch_one(query)

    @classmethod
    async def update(cls, pk: int, title: str) -> int:
        query = dataset_info.update().where(dataset_info.c.pk == pk).values(title=title)
        return await database.execute(query)


class ImageInfo:
    @classmethod
    async def insert(cls, info_dict: Dict) -> int:
        query = image_info.insert().values(info_dict)
        return await database.execute(query)

    @classmethod
    async def list(cls) -> List:
        query = image_info.select().order_by(image_info.c.pk)
        return await database.fetch_all(query)

    @classmethod
    async def detail(cls, pk: int) -> Tuple:
        query = image_info.select().where(image_info.c.pk == pk)
        return await database.fetch_one(query)

    @classmethod
    async def delete(cls, pk: int):
        query = image_info.delete().where(image_info.c.pk == pk)
        return await database.execute(query)


if __name__ == '__main__':
    sample_dataset_info_list = asyncio.run(DatasetInfo.list())
    sample_dataset_info_detail = asyncio.run(DatasetInfo.detail(pk=1))
    sample_dataset_info_get_image_list = asyncio.run(DatasetInfo.get_image_list(pk=1))
    sample_image_info_list = asyncio.run(ImageInfo.list())
    sample_image_info_detail = asyncio.run(ImageInfo.detail(pk=1))
    sample_get_last_dataset_info = asyncio.run(DatasetInfo.get_last_dataset_info())
    print("sample_get_last_dataset_info", sample_get_last_dataset_info)

    # sample_image_info_delete = asyncio.run(ImageInfo.delete(pk=1))
    image_info_dict1 = {
        "dataset_info_pk": 1,
        "original_file_name": "new_aaaa1.jpg",
        "uuid_file_name": "new_uuid1.jpg",
        "exif_degree": 90,
        "model_degree": 90,
        "confidence": 0.91,
        "user_fix_degree": 90
    }
    # sample_image_info_insert = asyncio.run(ImageInfo.insert(info_dict=image_info_dict1))
    # sample_dataset_info_insert = asyncio.run(DatasetInfo.insert())
    # sample_dataset_info_update = asyncio.run(DatasetInfo.update(pk=1, title="1_title", comment="1_comment"))
