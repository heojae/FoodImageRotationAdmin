import * as types from "../actions/ActionTypes"

const initialState = {
    pk: 0,
    email: "",
    profile_image: "",
    access_token: ""
}

export default function user(state = initialState, action) {
    switch (action.type) {
        case types.SET_USER_INFO:
            return {
                pk: action.pk,
                email: action.email,
                profile_image: action.profile_image,
                access_token: action.access_token
            }
        default:
            return state
    }
}
