import env from "react-dotenv";
import {InferenceImagePromiseClient} from "../../../../../../proto/user_grpc_web_pb"

export const client_inference_image = new InferenceImagePromiseClient(env.server_url, null, null);
