import {Empty} from "../../../../../../proto/empty_pb";
import {SelectedDatasetInfo, SelectedImageInfo, NewDatasetInfo} from "../../../../../../proto/dataset_pb"
import {client_dataset} from "./client";


export async function getDatasetInfoList(metadata = {"access_token": ""}, handleSetDatasetInfoList) {
    const req = new Empty();
    try {
        const stream = await client_dataset.getDatasetInfoList(req, metadata);
        const dataset_info_list = []
        stream.on("data", function (response) {
            let [pk, title] = response.array
            dataset_info_list.push({pk, title})
        })
        stream.on("end", function (end) {
            handleSetDatasetInfoList(dataset_info_list)
        });

    } catch (err) {
        return false
    }
}

export async function getChooseImageInfoList(dataset_pk = 0, metadata = {"access_token": ""}, handleSetDataCollectImageInfoList) {
    const req = new SelectedDatasetInfo();
    req.setDatasetInfoPk(dataset_pk)
    try {
        const stream = await client_dataset.getChooseImageInfoList(req, metadata);
        const image_info_list = []
        stream.on("data", function (response) {
            let [pk, dataset_info_pk, original_file_name, uuid_file_name, exif_degree, model_degree, confidence, user_fix_degree] = response.array

            if ((typeof pk) === "undefined") {
                pk = 0
            }
            if ((typeof dataset_info_pk) === "undefined") {
                dataset_info_pk = 0
            }
            if ((typeof original_file_name) === "undefined") {
                original_file_name = "none.jpg"
            }
            if ((typeof uuid_file_name) === "undefined") {
                uuid_file_name = "random.jpg"
            }
            if ((typeof exif_degree) === "undefined") {
                exif_degree = 0
            }
            if ((typeof model_degree) === "undefined") {
                model_degree = 0
            }
            if ((typeof confidence) === "undefined") {
                confidence = 0
            }
            if ((typeof user_fix_degree) === "undefined") {
                user_fix_degree = 0
            }

            image_info_list.push({
                pk,
                dataset_info_pk,
                original_file_name,
                uuid_file_name,
                exif_degree,
                model_degree,
                confidence,
                user_fix_degree
            })
        })
        stream.on("end", function (end) {
            handleSetDataCollectImageInfoList(dataset_pk, image_info_list)
        });

    } catch (err) {
        return false
    }
}


export async function removeImage(image_info_pk = 0, metadata = {"access_token": ""}) {
    const req = new SelectedImageInfo();
    req.setImageInfoPk(image_info_pk)
    try {
        await client_dataset.removeImage(req, metadata);
        return true;
    } catch (err) {
        return false
    }
}

export async function createDatasetInfo(title, metadata = {"access_token": ""}) {
    const req = new NewDatasetInfo();
    req.setTitle(title);
    try {
        await client_dataset.createDatasetInfo(req, metadata);
        return true;
    } catch (err) {
        return false;
    }

}



