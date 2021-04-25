import {
    CREATE_CUSTOMERS, CREATE_ERROR_CUSTOMERS, CREATE_ERROR_INVOICES, CREATE_INVOICES,
    DELETE_CUSTOMERS,
    DELETE_INVOICES, GET_CUSTOMERS, GET_INVOICES,
    LOAD_CUSTOMERS,
    LOAD_INVOICES,
    USER_CONNECTED,
    USER_ERROR
} from "../constants/constants";
import {LOCALHOST} from "../../config";


export const loadCustomers = () => {
    return {
        type: LOAD_CUSTOMERS,
    }
}

export const getCustomers = (data) => {
    return {
        type: GET_CUSTOMERS,
        items: data,
    }
}

export const setCustomer = (data) => {
    return {
        type: CREATE_CUSTOMERS,
        items: data,
    }
}

export const errorCustomer = (data) => {
    return {
        type: CREATE_ERROR_CUSTOMERS,
        error: data,
    }
}

export const deleteCustomer = (id) => {
    return {
        type: DELETE_CUSTOMERS,
        id: id,
    }
}

export const loadInvoices = () => {
    return {
        type: LOAD_INVOICES,
    }
}

export const getInvoices = (data) => {
    return {
        type: GET_INVOICES,
        items: data,
    }
}

export const setInvoices = (data) => {
    return {
        type: CREATE_INVOICES,
        items: data,
    }
}

export const errorInvoice = (data) => {
    return {
        type: CREATE_ERROR_INVOICES,
        error: data,
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
    dispatch(loadCustomers())
    return fetch(LOCALHOST + '/api/customers', {
        method: 'GET',
        headers: {
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

export const createCustomer = (data, bearer_token) => dispatch => {
    return fetch(LOCALHOST + '/api/customers', {
        method: 'POST',
        headers: {
            'Authorization': bearer(bearer_token),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            lastName: data.lastName,
            firstName: data.firstName,
            email: data.email,
            company: data.company,
        })
    })
        .then(response => {
            return response.json()
        })
        .then(response => {
            if (response.status === 201) {
                return dispatch(setCustomer(response))
            }
            return dispatch(errorCustomer(response.violations))
        })
}

export const putCustomers = (id, data, bearer_token) => dispatch => {
    return fetch(LOCALHOST + '/api/customers/' + id, {
        method: 'PUT',
        headers: {
            'Authorization': bearer(bearer_token),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            lastName: data.lastName,
            firstName: data.firstName,
            email: data.email,
            company: data.company,
        })
    })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            return dispatch(errorCustomer(response.violations));
        })
}


export const deleteCustomers = (id, bearer_token) => dispatch => {
    return fetch(LOCALHOST + '/api/customers/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': bearer(bearer_token),
            'Content-Type': 'application/json'
        },
    })
        .then(() => dispatch(deleteCustomer(id)))
}

export const fetchInvoices = (bearer_token) => dispatch => {
    dispatch(loadInvoices())
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
        headers: {
            'Authorization': bearer(bearer_token),
            'Content-Type': 'application/json'
        },
    })
        .then(() => dispatch(deleteInvoice(id)))
}

export const createInvoice = (data, bearer_token) => dispatch => {
    return fetch(LOCALHOST + '/api/invoices', {
        method: 'POST',
        headers: {
            'Authorization': bearer(bearer_token),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount: parseFloat(data.amount),
            customer: '/api/customers/' + data.customer,
            status: data.status,
        })
    })
        .then(response => {
            return response.json()
        })
        .then(response => {
            if (response.status === 201) {
                return dispatch(setInvoices(response))
            }
            console.log(response)
            return dispatch(errorInvoice(response.violations))
        })
}

export const putInvoices = (id, data, bearer_token) => dispatch => {
    return fetch(LOCALHOST + '/api/invoices/' + id, {
        method: 'PUT',
        headers: {
            'Authorization': bearer(bearer_token),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount: parseFloat(data.amount),
            customer: '/api/customers/' + data.customer,
            status: data.status,
        })
    })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            return dispatch(errorInvoice(response.violations));
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
            window.localStorage.setItem('authToken', response.token)
            return dispatch(login(response))
        })
}

export const registerUser = (data) => dispatch => {
    return fetch(LOCALHOST + '/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        })
    })
        .then(response => {
            return response.json()
        })
        .then(response => {
            if (response.status === 201) {
                return dispatch(login(response))
            }
            if (response.violations) {
                return dispatch(errorLogin(response.violations))
            }
        })
}
