import React, {useEffect, useState} from 'react';
import Field from "../components/forms/Field";
import {connect} from "react-redux";
import {registerUser} from "../redux/action/action";
import {Link} from "react-router-dom";

function RegisterPage({users, registerUser}) {
    const [user, setUser] = useState({
        "firstName": "",
        "lastName": "",
        "email": "",
        "password": "",
        "passwordConfirm": ""
    });

    const [error, setError] = useState({
        "firstName": "",
        "lastName": "",
        "email": "",
        "password": "",
        "passwordConfirm": ""
    });
    const apiError = {};
    useEffect(() => {
        if (users.error.length !== 0) {
            users.error.map(({propertyPath, message}) => {
                apiError[propertyPath] = message
            })
            setError(apiError);
        }
    }, [users.error])

    const handleChange = ({target}) => {
        const {name, value} = target
        setUser({...user, [name]: value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.password !== user.passwordConfirm) {
            apiError.passwordConfirm = "Les mots de passe ne sont pas identiques";
            setError(apiError);
            return;
        }
        registerUser(user);
        setError({});
    }

    return (
        <>
            <h1>Incription</h1>
            <form onSubmit={handleSubmit}>
                <Field name="firstName"
                       id="firstName"
                       value={user.firstName}
                       label="Votre prenom"
                       onChange={handleChange}
                       error={error.firstName}
                       placeholder="Veillez saisir votre prenom"/>
                <Field name="lastName"
                       id="lastName"
                       value={user.lastName}
                       label="Votre nom"
                       onChange={handleChange}
                       error={error.lastName}
                       placeholder="Veillez saisir votre nom"/>
                <Field name="email"
                       value={user.email}
                       label="Votre adresse mail"
                       onChange={handleChange}
                       error={error.email}
                       type="email"
                       placeholder="Veillez saisir votre adresse email"/>
                <Field name="password"
                       value={user.password}
                       label="Votre mot de passe"
                       onChange={handleChange}
                       error={error.password}
                       type="password"
                       placeholder="Veillez saisir votre mot de passe"/>
                <Field name="password"
                       value={user.passwordConfirm}
                       label="Confirmation de mot de passe"
                       onChange={handleChange}
                       error={error.passwordConfirm}
                       type="password"
                       placeholder="Veillez confirmer votre mot de passe" />
                <div className="form-group">
                    <button className="btn btn-success">S'inscrire</button>
                    <Link to="/login" className="btn btn-link">J'ai déjà un compte</Link>
                </div>
            </form>
        </>
    );
}

const mapStateToProps = state => {
    return {
        users: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registerUser: (user) => dispatch(registerUser(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
