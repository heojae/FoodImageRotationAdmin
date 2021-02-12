from typing import Dict, List

from model import DatasetInfo, ImageInfo


async def get_dataset_info_list() -> List:
    return await DatasetInfo.list()


async def get_image_info_list() -> List:
    return await ImageInfo.list()


async def get_choose_image_info_list(dataset_info_pk: int) -> List:
    return await DatasetInfo.get_image_list(pk=dataset_info_pk)


async def get_last_dataset_info():
    return await DatasetInfo.get_last_dataset_info()


async def insert_image_info(info_dict: Dict) -> int:
    return await ImageInfo.insert(info_dict=info_dict)


async def insert_dataset_info(title="untrained") -> int:
    return await DatasetInfo.insert(title=title)


async def update_dataset_info(pk: int, title: str) -> int:
    return await DatasetInfo.update(pk=pk, title=title)


async def delete_image_info(pk: int):
    return await ImageInfo.delete(pk=pk)
