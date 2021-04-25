import React, {useContext, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {loginUser} from "../redux/action/action";
import authContext from "../contexts/authContext";
import Field from "../components/forms/Field";

function LoginPage({loginUser, user, history}) {

    const {setIsAuthenticated} = useContext(authContext)
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setCredentials({...credentials, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(credentials)
        setIsAuthenticated(true)
        history.replace('/')
    }

    useEffect(() => {
        if(user.error){
            setError("Aucun compte ne possède cette adresse email ou les informations ne correspondent pas")
        }
    },[user.error])

    return (
        <>
            <h1>Page de connexion</h1>
            <form onSubmit={handleSubmit}>
                <Field
                    value={credentials.username}
                    onChange={handleChange}
                    error={error}
                    label="E-mail"
                    name="username"
                    placeholder="Entrer votre identifiant"
                    type="email" />
                <Field
                    value={credentials.password}
                    onChange={handleChange}
                    error={error}
                    label="Mot de passe"
                    name="password"
                    placeholder="Entrer votre mot de passe"
                    type="password" />

                <div className="form-group">
                    <button disabled={credentials.username === '' || credentials.password === ''}
                            className="btn btn-success">
                        Je me connecte
                    </button>
                </div>
            </form>
        </>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginUser: (credentials) => dispatch(loginUser(credentials)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
