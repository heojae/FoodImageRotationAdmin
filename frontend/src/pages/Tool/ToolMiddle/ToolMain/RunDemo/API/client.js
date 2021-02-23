import env from "react-dotenv";
import {InferenceImagePromiseClient} from "../../../../../../proto/inference_grpc_web_pb"
import {UserFixImagePromiseClient} from "../../../../../../proto/user_fix_image_grpc_web_pb"

export const client_inference_image = new InferenceImagePromiseClient(env.server_url, null, null);
export const client_user_fix_image = new UserFixImagePromiseClient(env.server_url, null, null);
