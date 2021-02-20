import * as types from "../actions/ActionTypes"

const initialState = {
    show_or_not: true
}

export default function sidebar(state = initialState, action) {
    switch (action.type) {
        case types.SET_SIDEBAR_SHOW_OR_NOT:
            return {
                show_or_not: !state.show_or_not
            }
        default:
            return state
    }
}
