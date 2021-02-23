import {Empty} from "../../../../../../proto/empty_pb";
import {client_model_version} from "./client";

export async function getUsingModelVersion(metadata) {
    const req = new Empty();
    try {
        const response = await client_model_version.getUsingModelVersion(req, metadata);
        const [pk, version_name, train_acc, test_acc, model_file_name, is_using] = response.array;
        return [pk, version_name, train_acc, test_acc, model_file_name, is_using];

    } catch (err) {
        return false;
    }
}

