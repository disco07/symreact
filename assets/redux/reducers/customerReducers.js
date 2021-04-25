import {CREATE_CUSTOMERS, CREATE_ERROR_CUSTOMERS, DELETE_CUSTOMERS, LOAD_CUSTOMERS} from "../constants/constants";


const initialState = {
    isLoading: false,
    items: [],
    error: []
}

const customerReducers = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CUSTOMERS:
            return {
                ...state,
                items: action.items,
                isLoading: false,
            }
        case DELETE_CUSTOMERS:
            const newItems = state.items.filter(item => item.id !== action.id)
            return {
                ...state,
                items: newItems,
            }
        case CREATE_CUSTOMERS:
            return {
                ...state,
                items: [...state.items, action.items],
                isLoading: false,
            }
        case CREATE_ERROR_CUSTOMERS:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            }
        default:
            return state
    }
}

export default customerReducers;
