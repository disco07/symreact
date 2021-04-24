import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import services from "../services/services";
import authContext from "../contexts/authContext";

function Navabar({history}) {
    const {isAuthenticated, setIsAuthenticated} = useContext(authContext)
    const handleLogout = () => {
        services.logout();
        setIsAuthenticated(false)
        history.push('/login')
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <NavLink className="navbar-brand" to="/">SymReact</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/customers">Clients</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/invoices">Factures</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        {!isAuthenticated ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/register" className="nav-link">Inscription</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/login" className="btn btn-success">Connexion</NavLink>
                                    </li>
                                </>
                            ) :
                            <li className="nav-item">
                                <button onClick={handleLogout} className="btn btn-danger">Déconnexion</button>
                            </li>}
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navabar;
