import base64
import grpc
import logging
import PIL

from proto.empty_pb2 import Empty
from io import BytesIO
from PIL import Image

from config import settings
from proto import inference_pb2, inference_pb2_grpc


def inference(image: PIL.Image.Image) -> inference_pb2.InferenceResult or None:
    with grpc.insecure_channel(settings.dl_api_listen_addr) as channel:
        image_file: BytesIO = BytesIO()
        image.save(image_file, format="PNG")
        image_bytes: bytes = image_file.getvalue()
        b64image: str = base64.b64encode(image_bytes)

        stub: inference_pb2_grpc.InferenceFoodImageStub = inference_pb2_grpc.InferenceFoodImageStub(channel)
        metadata = (('access_token', settings.access_token),)
        response: inference_pb2.InferenceResult = stub.Inference(
            inference_pb2.FoodB64Image(b64image=b64image), metadata=metadata)

        return response


def load_model(path: str) -> Empty or None:
    with grpc.insecure_channel(settings.dl_api_listen_addr) as channel:
        stub: inference_pb2_grpc.InferenceFoodImageStub = inference_pb2_grpc.InferenceFoodImageStub(channel)
        metadata = (('access_token', settings.access_token),)
        try:
            response = stub.LoadModel(inference_pb2.ModelPath(path=path), metadata=metadata)
            return response
        except grpc.RpcError as e:
            print(e)
            if grpc.StatusCode.INVALID_ARGUMENT == e.code():
                # TODO: you input invalid model path, so make new code for this case
                print(e.details())
                pass
            return


if __name__ == '__main__':
    logging.basicConfig()
    image: PIL.Image.Image = Image.open("./sample/sample1.jpg")  # Image.new('RGB', (224, 224), (127, 127, 127))
    sample_inference = inference(image=image)
    load_model(path="single_gpu_b0_bs_32_e_20.pth")
