import * as types from "../actions/ActionTypes";


const initialState = {
    choose_dataset_info_pk: 0,
    dataset_info_list: [],
    image_info_list: []
};

export default function data_collect(state = initialState, action) {
    switch (action.type) {
        case types.SET_DATA_COLLECT_DATASET_INFO_LIST:
            return {
                ...state,
                dataset_info_list: action.dataset_info_list
            }
        case types.SET_DATA_COLLECT_IMAGE_INFO_LIST:
            return {
                ...state,
                choose_dataset_info_pk: action.choose_dataset_info_pk,
                image_info_list: action.image_info_list
            }
        default:
            return state
    }
}

