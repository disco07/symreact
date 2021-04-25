import {applyMiddleware, combineReducers, createStore} from "redux";
import customerReducers from "./reducers/customerReducers";
import thunk from "redux-thunk";
import invoicesReducers from "./reducers/invoicesReducers";
import userReducers from "./reducers/userReducers";
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer = combineReducers({
    customer: customerReducers,
    invoices: invoicesReducers,
    user: userReducers,
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
