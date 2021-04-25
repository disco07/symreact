import React, {useEffect, useState} from 'react';
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {createCustomer, fetchCustomers, putCustomers} from "../redux/action/action";

function CustomerPage({createCustomer, fetchCustomers, putCustomers, customers, match, history}) {

    const {id = "new"} = match.params;
    const [editing, setEditing] = useState(false);
    const [customer, setCustomer] = useState({
        lastName: '',
        firstName: '',
        email: '',
        company: '',
    });

    const fetchCustomer = async (id) => {
        try {
            await fetchCustomers(localStorage.getItem('authToken'))
                .then(response => {
                    const {lastName, firstName, email, company} = response.items.filter(c => c.id === parseInt(id))[0];
                    setCustomer({lastName, firstName, email, company});
                })
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            fetchCustomer(id);
        }
    }, [])

    const [error, setError] = useState({
        lastName: '',
        firstName: '',
        email: '',
        company: '',
    });

    useEffect(() => {
        if (customers.error.length !== 0) {
            const apiError = {}
            customers.error.map(({propertyPath, message}) => {
                apiError[propertyPath] = message
            })
            setError(apiError);
        }
    }, [customers.error])

    const handleChange = ({target}) => {
        const {name, value} = target;
        setCustomer({...customer, [name]: value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        editing ? putCustomers(id, customer, localStorage.getItem('authToken')) && setError({}) :
            createCustomer(customer, localStorage.getItem('authToken')).then(() => setError({})) && history.replace('/customers');
        }
    return (
        <>
            {
                editing &&
                <h1>Modifcation d'un client</h1> || <h1>Création d'un client</h1>
            }
            <form onSubmit={handleSubmit}>
                <Field value={customer.lastName}
                       onChange={handleChange}
                       name="lastName"
                       placeholder="Entrer votre nom de famille"
                       error={error.lastName}
                       label="Nom du client"/>
                <Field value={customer.firstName}
                       onChange={handleChange}
                       name="firstName"
                       placeholder="Entrer votre prénom"
                       error={error.firstName}
                       label="Prénom du client"/>
                <Field value={customer.email}
                       onChange={handleChange}
                       name="email"
                       placeholder="Entrer l'adresse mail"
                       error={error.email}
                       label="E-mail du client"
                       type="email"/>
                <Field value={customer.company}
                       onChange={handleChange}
                       name="company"
                       placeholder="Entreprise du client"
                       error={error.company}
                       label="Entreprise du client"/>
                <div className="form-group">
                    <button className="btn btn-success">Enregistrer</button>
                    <Link to="/customers" className="btn btn-link">Retour à la liste</Link>
                </div>
            </form>
        </>
    );
}

const mapStateToProps = state => {
    return {
        customers: state.customer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCustomers: (bearer_token) => dispatch(fetchCustomers(bearer_token)),
        putCustomers: (id, data, bearer_token) => dispatch(putCustomers(id, data, bearer_token)),
        createCustomer: (data, token) => dispatch(createCustomer(data, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerPage);
