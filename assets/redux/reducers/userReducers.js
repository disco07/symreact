import {USER_CONNECTED, USER_ERROR} from "../constants/constants";

const initialState = {
    isLoading: false,
    user: '',
    error: '',
}

const userReducers = (state= initialState, action) => {
    switch (action.type) {
        case USER_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.data,
                user: ''
            }
        case USER_CONNECTED:
            window.localStorage.setItem('authToken', action.user.token)
            return {
                ...state,
                isLoading: false,
                user: action.user,
                error: ""
            }
        default:
            return {
                ...state
            }
    }
}

export default userReducers;
