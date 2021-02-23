import env from "react-dotenv";
import {ModelVersionPromiseClient} from "../../../../../../proto/model_version_grpc_web_pb"

export const client_model_version = new ModelVersionPromiseClient(env.server_url, null, null);

