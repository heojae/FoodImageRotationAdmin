import grpc
import logging
import PIL

from concurrent import futures
from proto.empty_pb2 import Empty
from PIL import Image

from authenticate import AuthenticateUserAccessToken
from config import settings
from dl_model import FiraEfficientNet
from dl_utils import load_model_weight_from_pth, inference_image
from proto import inference_pb2, inference_pb2_grpc
from utils import check_exif_data_and_rotate_image, convert_b64image2pil_image, save_convert_b64image2pil_image, \
    get_using_model_version_info

# ---------------------------- Setup Model for Global  -------------------------------
model: FiraEfficientNet or None


# ----------------------------------------------------------------------------------


class InferenceImageServicer(inference_pb2_grpc.InferenceImageServicer):

    def Inference(self, request: inference_pb2.BytesImage,
                  context: grpc.aio.ServicerContext) -> inference_pb2.InferenceResult:
        global model
        print("inference")
        print(request.image_content)

    def LoadModel(self, request: inference_pb2.ModelPath, context: grpc.aio.ServicerContext) -> Empty:
        global model
        print("load_model")


def serve() -> None:
    global model
    model = FiraEfficientNet(first_train=False)
    model_version_info = get_using_model_version_info()
    model = load_model_weight_from_pth(model, model_file_name=model_version_info.model_file_name)
    model.eval()

    server = grpc.server(futures.ThreadPoolExecutor(max_workers=4),
                         interceptors=(AuthenticateUserAccessToken(free_pass_method_name_list=[]),))
    inference_pb2_grpc.add_InferenceImageServicer_to_server(InferenceImageServicer(), server)
    listen_port = settings.dl_api_listen_port
    server.add_insecure_port(listen_port)
    logging.info("Starting server on %s", listen_port)

    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)

    serve()
