import env from "react-dotenv";
import {UserPromiseClient} from "../../../../proto/user_grpc_web_pb"

export const client_user = new UserPromiseClient(env.server_url, null, null);

