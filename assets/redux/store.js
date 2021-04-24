import {applyMiddleware, combineReducers, createStore} from "redux";
import customerReducers from "./reducers/customerReducers";
import thunk from "redux-thunk";
import invoicesReducers from "./reducers/invoicesReducers";
import userReducers from "./reducers/userReducers";

const rootReducer = combineReducers({
    customer: customerReducers,
    invoices: invoicesReducers,
    user: userReducers,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
