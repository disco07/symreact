import React, {useContext, useState} from 'react';
import {connect} from "react-redux";
import {loginUser} from "../redux/action/action";
import authContext from "../contexts/authContext";

function LoginPage({loginUser, user, history}) {

    const {setIsAuthenticated} = useContext(authContext)
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

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

    return (
        <>
            <h1>Page de connexion</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">E-mail</label>
                    <input type="email"
                           value={credentials.username}
                           onChange={handleChange}
                           placeholder="Entrer votre identifiant"
                           id="username" name="username"
                           className={"form-control" + (user.error && " is-invalid")}/>
                    {user.error && <p className="invalid-feedback">Aucun compte ne possède cette adresse email ou les informations ne correspondent pas</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password"
                           value={credentials.password}
                           onChange={handleChange}
                           placeholder="Entrer votre mot de passe"
                           id="password"
                           name="password"
                           className="form-control"/>
                </div>
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
