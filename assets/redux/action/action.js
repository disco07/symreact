import {DELETE_CUSTOMERS, DELETE_INVOICES, LOAD_CUSTOMERS, LOAD_INVOICES} from "../constants/constants";
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

export const fetchCustomers = () => dispatch => {
    return fetch(LOCALHOST+'/api/customers')
        .then(response => {
            return response.json();
        })
        .then(response => {
            return dispatch(getCustomers(response['hydra:member']))
        })
}

export const deleteCustomers = (id) => dispatch => {
    return fetch(LOCALHOST + '/api/customers/' + id, {
        method: 'DELETE',
    })
        .then(() => dispatch(deleteCustomer(id)))
}

export const fetchInvoices = () => dispatch => {
    return fetch(LOCALHOST+'/api/invoices')
        .then(response => {
            return response.json();
        })
        .then(response => {
            return dispatch(getInvoices(response['hydra:member']))
        })
}

export const deleteInvoices = (id) => dispatch => {
    return fetch(LOCALHOST + '/api/invoices/' + id, {
        method: 'DELETE',
    })
        .then(() => dispatch(deleteInvoice(id)))
}

export const putInvoices = (id, data) => dispatch => {
    return fetch(LOCALHOST + '/api/invoices/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: data
        })
    })
}
