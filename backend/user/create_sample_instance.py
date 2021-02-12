import asyncio

from config import settings
from db import database
from model import users


async def create_db_base_sample_instance():
    await database.connect()
    # -------------------------------- Create Database Instance  ----------------------------
    query1 = users.insert().values(email=settings.admin_email, password=settings.admin_password,
                                   profile_image=settings.admin_profile_image, access_token=settings.access_token)
    await asyncio.gather(
        database.execute(query1),
    )
    # -------------------------------- Finish Database Instance  ----------------------------
    await database.disconnect()


if __name__ == '__main__':
    asyncio.run(create_db_base_sample_instance())
