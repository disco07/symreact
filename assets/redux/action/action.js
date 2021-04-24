import {
    DELETE_CUSTOMERS,
    DELETE_INVOICES,
    LOAD_CUSTOMERS,
    LOAD_INVOICES,
    USER_CONNECTED,
    USER_ERROR
} from "../constants/constants";
import {LOCALHOST} from "../../config";

export const getCustomers = (data) => {
    return {
        type: LOAD_CUSTOMERS,
        items: data,
    }
}

export const deleteCustomer = (id) => {
    return {
        type: DELETE_CUSTOMERS,
        id: id,
    }
}

export const getInvoices = (data) => {
    return {
        type: LOAD_INVOICES,
        items: data,
    }
}

export const deleteInvoice = (id) => {
    return {
        type: DELETE_INVOICES,
        id: id,
    }
}

export const login = (data) => {
    return {
        type: USER_CONNECTED,
        user: data,
    }
}

export const errorLogin = (data) => {
    return {
        type: USER_ERROR,
        data: data,
    }
}

const bearer = (bearer_token) => 'Bearer ' + bearer_token;

export const fetchCustomers = (bearer_token) => dispatch => {
    return fetch(LOCALHOST + '/api/customers', {
        method: 'GET',
        headers:{
            'Authorization': bearer(bearer_token),
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.json();
        })
        .then(response => {
            return dispatch(getCustomers(response['hydra:member']))
        })
}

export const deleteCustomers = (id, bearer_token) => dispatch => {
    return fetch(LOCALHOST + '/api/customers/' + id, {
        method: 'DELETE',
        headers:{
            'Authorization': bearer(bearer_token),
            'Content-Type': 'application/json'
        },
    })
        .then(() => dispatch(deleteCustomer(id)))
}

export const fetchInvoices = (bearer_token) => dispatch => {
    return fetch(LOCALHOST + '/api/invoices', {
        method: 'GET',
        headers: {
            'Authorization': bearer(bearer_token),
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            return response.json();
        })
        .then(response => {
            return dispatch(getInvoices(response['hydra:member']))
        })
}

export const deleteInvoices = (id, bearer_token) => dispatch => {
    return fetch(LOCALHOST + '/api/invoices/' + id, {
        method: 'DELETE',
        headers:{
            'Authorization': bearer(bearer_token),
            'Content-Type': 'application/json'
        },
    })
        .then(() => dispatch(deleteInvoice(id)))
}

export const putInvoices = (id, data, bearer_token) => dispatch => {
    return fetch(LOCALHOST + '/api/invoices/' + id, {
        method: 'PUT',
        headers: {
            'Authorization': bearer(bearer_token),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: data
        })
    })
}

export const loginUser = (data) => dispatch => {
    return fetch(LOCALHOST + '/api/login_check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: data.username,
            password: data.password
        })
    })
        .then(response => {
            if (!response.ok) {
                return dispatch(errorLogin(response))
            }
            return response.json()
        })
        .then(response => {
            return dispatch(login(response))
        })
}
