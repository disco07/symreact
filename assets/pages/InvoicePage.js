import React, {useEffect, useState} from 'react';
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {createInvoice, fetchCustomers, fetchInvoices, putInvoices} from "../redux/action/action";
import Select from "../components/forms/Select";

function InvoicePage({createInvoice, fetchInvoices, fetchCustomers, putInvoices, invoices, match, history}) {

    const {id = "new"} = match.params;
    const [editing, setEditing] = useState(false);
    const [invoice, setInvoice] = useState({
        amount: '',
        customer: '',
        status: 'SENT',
    });
    const [customers, setCustomers] = useState([]);

    const fetchInvoice = async (id) => {
        try {
            await fetchInvoices(localStorage.getItem('authToken'))
                .then(response => {
                    const {amount, customer, status} = response.items.filter(i => i.id === parseInt(id))[0];
                    setInvoice({amount, customer: customer.id, status});
                    setCustomers([customer])
                })
        } catch (e) {
            console.log(e)
        }
    }

    const fetchCustomer = async () => {
        try {
            await fetchCustomers(localStorage.getItem('authToken'))
                .then(response => {
                    setCustomers(response.items);
                    if (!invoice.customer) setInvoice({...invoice, customer: response.items[0].id})
                })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (id !== 'new') {
            setEditing(true)
            fetchInvoice(id)
        }else {
            fetchCustomer();
        }
    }, [id])

    const [error, setError] = useState({
        amount: '',
        customer: '',
        status: '',
    });

    const handleChange = ({target}) => {
        const {name, value} = target;
        setInvoice({...invoice, [name]: value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editing) {
            setError({});
            if (invoice.amount === "") {
                setError({amount: "Veillez saisir un montant"})
            } else {
                putInvoices(id, invoice, localStorage.getItem('authToken'))
                setError({})
                history.replace('/invoices');
            }
        } else {
            setError({});
            if (invoice.amount === "") {
                setError({amount: "Veillez saisir un montant"})
            } else {
                createInvoice(invoice, localStorage.getItem('authToken'))
                    .then(() => {
                        setError({})
                        history.replace('/invoices');
                    });
            }
        }
    }
    return (
        <>
            {
                editing &&
                <h1>Modifcation d'une facture</h1> || <h1>Création d'une facture</h1>
            }
            <form onSubmit={handleSubmit}>
                <Field value={invoice.amount}
                       onChange={handleChange}
                       type="number"
                       name="amount"
                       placeholder="Montant de la facture"
                       error={error.amount}
                       label="Montant"/>
                <Select name="customer" label="Client" onChange={handleChange} value={invoice.customer}
                        error={error.customer}>
                    {
                        customers.map(customer => <option key={customer.id}
                                                          value={customer.id}>{customer.firstName} {customer.lastName}</option>)
                    }
                </Select>
                <Select name="status" label="Statut" value={invoice.status} error={error.status}
                        onChange={handleChange}>
                    <option value="SENT">Envoyée</option>
                    <option value="PAID">Payée</option>
                    <option value="CANCELLED">Annulée</option>
                </Select>
                <div className="form-group">
                    <button className="btn btn-success">Enregistrer</button>
                    <Link to="/invoices" className="btn btn-link">Retour à la liste</Link>
                </div>
            </form>
        </>
    );
}

const mapStateToProps = state => {
    return {
        invoices: state.invoices,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCustomers: (bearer_token) => dispatch(fetchCustomers(bearer_token)),
        fetchInvoices: (bearer_token) => dispatch(fetchInvoices(bearer_token)),
        putInvoices: (id, data, bearer_token) => dispatch(putInvoices(id, data, bearer_token)),
        createInvoice: (data, token) => dispatch(createInvoice(data, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoicePage);
