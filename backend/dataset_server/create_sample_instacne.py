import asyncio
import uuid

from db import database
from model import dataset_info, image_info


async def create_db_base_sample_instance():
    await database.connect()
    # -------------------------------- Create Database Instance  ----------------------------
    query_dataset_1 = dataset_info.insert().values(title="sample_dataset1")
    query_dataset_2 = dataset_info.insert().values(title="untrained")

    await database.execute(query_dataset_1)
    await database.execute(query_dataset_2)
    # -------------------------------- Finish Database Instance  ----------------------------
    # -------------------------------- Create ImageInfo Instance  ----------------------------
    info_dict = {
        "dataset_info_pk": 1,
        "original_file_name": "food.jpg",
        "uuid_file_name": "{}.{}".format(uuid.uuid4(), "jpg"),
        "exif_degree": 0,
        "model_degree": 0,
        "confidence": 0,
        "user_fix_degree": 0
    }
    query_image_info_1 = image_info.insert().values(info_dict)
    query_image_info_2 = image_info.insert().values(info_dict)

    await asyncio.gather(
        database.execute(query_image_info_1),
        database.execute(query_image_info_2),
    )

    # -------------------------------- Finish ImageInfo Instance  ----------------------------

    await database.disconnect()


if __name__ == '__main__':
    asyncio.run(create_db_base_sample_instance())
