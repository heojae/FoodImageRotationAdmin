import * as types from "../actions/ActionTypes"

const initialState = {
    model_version_using: {
        pk: 0,
        version_name: "",
        train_acc: 0,
        test_acc: 0,
        model_file_name: "",
        is_using: true
    },
    model_version_all: []
}

export default function model_version(state = initialState, action) {
    switch (action.type) {
        case types.SET_MODEL_VERSION_USING:
            return {
                ...state,
                model_version_using: action.model_version_using
            }
        case types.SET_MODEL_VERSION_ALL:
            return {
                ...state,
                model_version_all: action.model_version_all
            }
        default:
            return state
    }

}


