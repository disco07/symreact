import {USER_CONNECTED, USER_ERROR} from "../constants/constants";

const initialState = {
    isLoading: false,
    user: '',
    error: [],
}

const userReducers = (state= initialState, action) => {
    switch (action.type) {
        case USER_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.data,
            }
        case USER_CONNECTED:
            return {
                ...state,
                isLoading: false,
                user: action.user,
            }
        default:
            return {
                ...state
            }
    }
}

export default userReducers;
