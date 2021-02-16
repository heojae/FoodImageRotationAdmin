import {LoginInfo} from "../../../../proto/user_pb";

export async function login(client_user, email, password, metadata = {}) {
    const req = new LoginInfo();
    req.setEmail(email);
    req.setPassword(password);
    try {
        const response = await client_user.login(req, metadata);
        const [pk, email, profile_image, access_token] = response.array;
        return [pk, email, profile_image, access_token]
    } catch (err) {
        return false
    }
}