import {DELETE_CUSTOMERS, LOAD_CUSTOMERS} from "../constants/constants";


const initialState = {
    isLoading: false,
    items: [],
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
        default:
            return state
    }
}

export default customerReducers;
