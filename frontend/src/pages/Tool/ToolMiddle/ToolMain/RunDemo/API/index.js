import {BytesImage} from "../../../../../../proto/inference_pb";
import {UserFixedImageInfo} from "../../../../../../proto/user_fix_image_pb";
import {client_inference_image, client_user_fix_image} from "./client";

export async function inference(uint8ArrayImage, metadata = {"access_token": ""}) {
    const req = new BytesImage();
    req.setImageContent(uint8ArrayImage);
    try {
        const response = await client_inference_image.inference(req, metadata);
        let [model_degree, exif_degree, confidence, success] = response.array;

        if ((typeof model_degree) === "undefined") {
            model_degree = 0
        }
        if ((typeof exif_degree) === "undefined") {
            exif_degree = 0
        }
        if ((typeof confidence) === "undefined") {
            confidence = 0
        }
        if ((typeof success) === "undefined") {
            success = true
        }

        return [model_degree, exif_degree, confidence, success];
    } catch (err) {
        return false;
    }
}

export async function saveUserFixImage(uint8ArrayImage, file_name, exif_degree, model_degree, confidence, user_fix_degree, metadata = {"access_token": ""}) {
    const req = new UserFixedImageInfo();
    req.setImageContent(uint8ArrayImage);
    req.setFileName(file_name);
    req.setExifDegree(exif_degree);
    req.setModelDegree(model_degree);
    req.setConfidence(confidence);
    req.setUserFixDegree(user_fix_degree);

    try {
        await client_user_fix_image.saveUserFixImage(req, metadata);
        return true;
    } catch (err) {
        return false;
    }


}

