import asyncio

from db import database
from model import model_versions


async def create_db_base_sample_instance():
    await database.connect()
    # -------------------------------- Create Database Instance  ----------------------------
    query1 = model_versions.insert().values(version_name='1.0.0', train_acc=0.9920, test_acc=0.73,
                                            model_file_name="cpu_only_b0_bs1_e_10.pth", is_using=False)

    query2 = model_versions.insert().values(version_name='1.0.1', train_acc=0.95, test_acc=0.96,
                                            model_file_name="cpu_only_b0_bs16_e_10.pth", is_using=False)

    query3 = model_versions.insert().values(version_name='1.1.0', train_acc=0.98370, test_acc=0.9898,
                                            model_file_name="single_gpu_b0_bs_32_e_10.pth", is_using=False)

    query4 = model_versions.insert().values(version_name='1.1.1', train_acc=0.96196, test_acc=0.9866,
                                            model_file_name="single_gpu_b0_bs_64_e_10.pth", is_using=False)

    query5 = model_versions.insert().values(version_name='1.1.2', train_acc=0.96196, test_acc=0.9648,
                                            model_file_name="single_gpu_b0_bs_96_e_10.pth", is_using=False)

    query6 = model_versions.insert().values(version_name='1.2.0', train_acc=0.99, test_acc=0.99,
                                            model_file_name="single_gpu_b0_bs_32_e_20.pth", is_using=True)

    await asyncio.gather(
        database.execute(query1),
        database.execute(query2),
        database.execute(query3),
        database.execute(query4),
        database.execute(query5),
        database.execute(query6),
    )

    # -------------------------------- Finish Database Instance  ----------------------------
    await database.disconnect()


if __name__ == '__main__':
    asyncio.run(create_db_base_sample_instance())
