import * as types from "../actions/ActionTypes"

const initialState = {
    mode: "CheckResult",  // CheckResult, FixData
    file_list: [],
    fix_file_list: [],
    is_mode_change: false,
    is_file_list_change: false,
    is_fix_file_list_change: false,
}

export default function run_demo(state = initialState, action) {
    switch (action.type) {
        case types.SET_RUN_DEMO_MODE:
            return {
                ...state,
                mode: action.mode,
                is_mode_change: true,
                is_file_list_change: false,
                is_fix_file_list_change: false
            }

        case types.SET_RUN_DEMO_FILE_LIST:
            return {
                ...state,
                file_list: action.file_list,
                is_mode_change: false,
                is_file_list_change: true,
                is_fix_file_list_change: false
            }

        case types.SET_RUN_DEMO_CONVERT_FILE_IN_FILE_LIST_TO_FIX_FILE_LIST:
            return {
                ...state,
                fix_file_list: state.fix_file_list.concat([action.fix_file]),
                is_mode_change: false,
                is_file_list_change: false,
                is_fix_file_list_change: true
            }

        default:
            return state
    }
}
