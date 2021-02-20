import {BytesImage} from "../../../../../../proto/inference_pb";
import {client_inference_image} from "./client";

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
