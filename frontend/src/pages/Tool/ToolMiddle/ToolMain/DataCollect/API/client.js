import env from "react-dotenv";
import {DatasetPromiseClient} from "../../../../../../proto/dataset_grpc_web_pb"

export const client_dataset = new DatasetPromiseClient(env.server_url, null, null);

