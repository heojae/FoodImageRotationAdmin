import * as types from "./ActionTypes";

// ------------------------------------------ user info -------------------------------------------
export function setUserInfo(pk, email, profile_image, access_token) {
    return {
        type: types.SET_USER_INFO,
        pk,
        email,
        profile_image,
        access_token
    }
}

// ------------------------------------------ sidebar show or not -------------------------------------------
export function setSidebarShowOrNot() {
    return {
        type: types.SET_SIDEBAR_SHOW_OR_NOT
    }
}


// ------------------------------------------ tool choice -------------------------------------------
export function setToolMode(mode) {
    return {
        type: types.SET_TOOL_MODE,
        mode
    }
}

// ------------------------------------------ run demo -------------------------------------------
export function setRunDemoMode(mode) {
    return {
        type: types.SET_RUN_DEMO_MODE,
        mode
    }
}

export function setRunDemoFileList(file_list) {
    return {
        type: types.SET_RUN_DEMO_FILE_LIST,
        file_list
    }
}

export function setRunDemoConvertFileInFileListToFixFileList(fix_file) {
    return {
        type: types.SET_RUN_DEMO_CONVERT_FILE_IN_FILE_LIST_TO_FIX_FILE_LIST,
        fix_file
    }
}

export function setRunDemoRemoveFixFile(uuid_key) {
    return {
        type: types.SET_RUN_DEMO_REMOVE_FIX_FILE,
        uuid_key
    }
}

// ------------------------------------------ data collect -------------------------------------------
export function setDataCollectDatasetInfoList(dataset_info_list) {
    return {
        type: types.SET_DATA_COLLECT_DATASET_INFO_LIST,
        dataset_info_list
    }
}

export function setDataCollectImageInfoList(choose_dataset_info_pk, image_info_list) {
    return {
        type: types.SET_DATA_COLLECT_IMAGE_INFO_LIST,
        choose_dataset_info_pk,
        image_info_list
    }
}

// ------------------------------------------ model version -------------------------------------------
export function setModelVersionUsing(model_version_using) {
    return {
        type: types.SET_MODEL_VERSION_USING,
        model_version_using
    }
}

export function setModelVersionAll(model_version_all) {
    return {
        type: types.SET_MODEL_VERSION_ALL,
        model_version_all
    }
}
