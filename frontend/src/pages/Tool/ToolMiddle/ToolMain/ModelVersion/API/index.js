import {Empty} from "../../../../../../proto/empty_pb";
import {SelectedModelVersion} from "../../../../../../proto/model_version_pb";
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


export async function getAllModelVersion(metadata, handleSetModelVersionAll) {
    const req = new Empty();
    try {
        const stream = await client_model_version.getAllModelVersion(req, metadata);
        const model_version_all = []
        stream.on("data", function (response) {
            let [pk, version_name, train_acc, test_acc, model_file_name, is_using] = response.array
            model_version_all.push({pk, version_name, train_acc, test_acc, model_file_name, is_using})
        })
        stream.on("end", function (end) {
            handleSetModelVersionAll(model_version_all)
        });
    } catch (err) {
        return false
    }
}

export async function changeModelVersion(model_version_pk, metadata) {
    const req = new SelectedModelVersion();
    req.setPk(model_version_pk);
    try {
         await client_model_version.change(req, metadata);
         return true;
    } catch (err) {
        console.log("err : ", err)
        return false;
    }
}
