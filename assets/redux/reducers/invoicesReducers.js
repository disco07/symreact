import {DELETE_CUSTOMERS, DELETE_INVOICES, LOAD_CUSTOMERS, LOAD_INVOICES} from "../constants/constants";


const initialState = {
    isLoading: false,
    items: [],
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
        default:
            return state
    }
}

export default invoicesReducers;
