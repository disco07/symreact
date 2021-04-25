import {
    CREATE_ERROR_INVOICES, CREATE_INVOICES,
    DELETE_INVOICES,
    LOAD_INVOICES
} from "../constants/constants";


const initialState = {
    isLoading: false,
    items: [],
    error: []
}

const invoicesReducers = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_INVOICES:
            return {
                ...state,
                items: action.items,
                isLoading: false,
            }
        case DELETE_INVOICES:
            const newItems = state.items.filter(item => item.id !== action.id)
            return {
                ...state,
                items: newItems,
            }
        case CREATE_INVOICES:
            return {
                ...state,
                items: [...state.items, action.items],
                isLoading: false,
            }
        case CREATE_ERROR_INVOICES:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            }
        default:
            return state
    }
}

export default invoicesReducers;
