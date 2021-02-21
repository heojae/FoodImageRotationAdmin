import {Empty} from "../../../../../../proto/empty_pb";
import {SelectedDatasetInfo} from "../../../../../../proto/dataset_pb"
import {client_dataset} from "./client";


export async function getDatasetInfoList(metadata = {"access_token": ""}, handleSetDatasetInfoList) {
    const req = new Empty();
    try {
        const stream = await client_dataset.getDatasetInfoList(req, metadata);
        const dataset_info_list = []
        stream.on("data", function (response) {
            let [pk, title] = response.array
            dataset_info_list.push([pk, title])
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




