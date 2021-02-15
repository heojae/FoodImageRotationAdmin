import * as types from "../actions/ActionTypes"

const initialState = {
    mode: "RunDemo",  // RunDemo, DataCollect, ModelVersion
}

export default function tool(state = initialState, action) {
    switch (action.type) {
        case types.SET_TOOL_MODE:
            return {
                mode: action.mode
            }
        default:
            return state
    }
}
