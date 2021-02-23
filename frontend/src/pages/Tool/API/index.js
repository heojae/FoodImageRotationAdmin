import {Empty} from "../../../proto/empty_pb";
import {client_user} from "./client";

export async function getUserInfoWithToken(metadata = {"access_token": ""}) {
    const req = new Empty();
    try {
        const response = await client_user.authenticateGetUserInfo(req, metadata);
        const [pk, email, profile_image, access_token] = response.array;
        return [pk, email, profile_image, access_token];
    } catch (err) {
        return false;
    }
}
