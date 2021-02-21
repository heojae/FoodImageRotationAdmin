import * as types from "../actions/ActionTypes";


const initialState = {
    image_info_list: []
};

export default function data_collect(state = initialState, action) {
    switch (action.type) {
        case types.SET_DATA_COLLECT_IMAGE_INFO_LIST:
            return {
                image_info_list: action.image_info_list
            }
        default:
            return state
    }
}

