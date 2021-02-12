import asyncio
import aiofiles
import grpc
import logging
import PIL
import uuid
import uvloop

from aiofiles import os as aio_os
from io import BytesIO
from PIL import Image

from proto.empty_pb2 import Empty

from authenticate import AuthenticateUserAccessToken
from config import settings
from proto import dataset_pb2, dataset_pb2_grpc
from proto import user_fix_image_pb2_grpc
from utils import get_dataset_info_list, get_image_info_list, get_choose_image_info_list, get_last_dataset_info, \
    insert_image_info, update_dataset_info, insert_dataset_info, delete_image_info


class DatasetServicer(dataset_pb2_grpc.DatasetServicer):
    async def GetDatasetInfoList(self, request, context):
        print("GetDatasetInfoList")
        dataset_info_list = await get_dataset_info_list()
        for dataset_info in dataset_info_list:
            yield dataset_pb2.DatasetInfo(pk=dataset_info.pk, title=dataset_info.title)

    async def GetImageInfoList(self, request, context):
        print("GetImageInfoList")
        image_info_list = await get_image_info_list()
        for image_info in image_info_list:
            yield dataset_pb2.ImageInfo(pk=image_info.pk,
                                        dataset_info_pk=image_info.dataset_info_pk,
                                        original_file_name=image_info.original_file_name,
                                        uuid_file_name=image_info.uuid_file_name,
                                        exif_degree=image_info.exif_degree,
                                        model_degree=image_info.model_degree,
                                        confidence=image_info.confidence,
                                        user_fix_degree=image_info.user_fix_degree,
                                        )

    async def GetChooseImageInfoList(self, request, context):
        print("GetChooseImageInfoList")
        image_info_list = await get_choose_image_info_list(dataset_info_pk=request.dataset_info_pk)
        for image_info in image_info_list:
            yield dataset_pb2.ImageInfo(pk=image_info.pk,
                                        dataset_info_pk=image_info.dataset_info_pk,
                                        original_file_name=image_info.original_file_name,
                                        uuid_file_name=image_info.uuid_file_name,
                                        exif_degree=image_info.exif_degree,
                                        model_degree=image_info.model_degree,
                                        confidence=image_info.confidence,
                                        user_fix_degree=image_info.user_fix_degree,
                                        )

    async def CreateDatasetInfo(self, request, context):
        print("CreateDatasetInfo")
        now_last_dataset_info = await get_last_dataset_info()
        await update_dataset_info(pk=now_last_dataset_info.pk, title=request.title)
        new_dataset_info_pk = await insert_dataset_info(title="untrained")
        await aio_os.mkdir("./media/{}".format(new_dataset_info_pk))

        return Empty()

    async def RemoveImage(self, request, context):
        print("RemoveImage")
        success = await delete_image_info(pk=request.image_info_pk)
        if success:
            return Empty()

        context.set_details("Image Info instance does not exist")
        context.set_code(grpc.StatusCode.INVALID_ARGUMENT)
        return Empty()


class UserFixImageServicer(user_fix_image_pb2_grpc.UserFixImageServicer):
    async def SaveUserFixImage(self, request, context):
        print("SaveUserFixImage")

        bytes_image_file: BytesIO = BytesIO(request.image_content)

        try:
            Image.open(bytes_image_file)
        except PIL.UnidentifiedImageError:
            context.set_details("Invalid Image data Come")
            context.set_code(grpc.StatusCode.INVALID_ARGUMENT)
            return Empty()

        last_dataset_info = await get_last_dataset_info()

        save_file_name = str(uuid.uuid4()) + ".jpg"
        save_file_path = "./media/{}/{}".format(last_dataset_info.pk, save_file_name)
        info_dict = {
            "dataset_info_pk": last_dataset_info.pk,
            "original_file_name": request.file_name,
            "uuid_file_name": save_file_name,
            "exif_degree": request.exif_degree,
            "model_degree": request.model_degree,
            "confidence": request.confidence,
            "user_fix_degree": request.user_fix_degree
        }

        async with aiofiles.open(save_file_path, "wb") as f:
            await f.write(bytes_image_file.getbuffer())

        await insert_image_info(info_dict=info_dict)

        return Empty()


async def serve() -> None:
    server = grpc.aio.server(interceptors=(AuthenticateUserAccessToken(free_pass_method_name_list=[]),))
    dataset_pb2_grpc.add_DatasetServicer_to_server(DatasetServicer(), server)
    user_fix_image_pb2_grpc.add_UserFixImageServicer_to_server(UserFixImageServicer(), server)
    listen_port = settings.dataset_api_listen_port
    server.add_insecure_port(listen_port)
    logging.info("Starting server on %s", listen_port)
    await server.start()
    try:
        await server.wait_for_termination()
    except KeyboardInterrupt:
        await server.stop(0)


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)

    asyncio.set_event_loop_policy(uvloop.EventLoopPolicy())
    asyncio.run(serve())
