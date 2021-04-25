import React, {useContext} from 'react';
import authContext from "../contexts/authContext";
import {Redirect, Route} from "react-router-dom";

const PrivateRoute = ({path, component}) => {
    const {isAuthenticated} = useContext(authContext);
    return isAuthenticated ? <Route path={path} isAuthenticated={isAuthenticated} component={component}/> : <Redirect to="/login"/>
}

export default PrivateRoute;
