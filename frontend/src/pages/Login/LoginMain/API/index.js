import {LoginInfo} from "../../../../proto/user_pb";
import {client_user} from "./client";

export async function login(email, password, metadata = {}) {
    const req = new LoginInfo();
    req.setEmail(email);
    req.setPassword(password);
    console.log("email : ", email)
    try {
        const response = await client_user.login(req, metadata);
        const [pk, email, profile_image, access_token] = response.array;
        return [pk, email, profile_image, access_token]
    } catch (err) {
        console.log(err)
        return false
    }
}