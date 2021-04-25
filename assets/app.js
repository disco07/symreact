import React, {useContext, useState} from 'react';
import ReactDOM from 'react-dom';
import Navabar from "./components/Navabar";
import HomePage from "./pages/HomePage";
import {HashRouter, Switch, Route, withRouter, Redirect} from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import store from "./redux/store";
import {Provider} from "react-redux";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";
import services from "./services/services";
import authContext from "./contexts/authContext";
import PrivateRoute from "./components/PrivateRoute";
import CustomerPage from "./pages/CustomerPage";
import InvoicePage from "./pages/InvoicePage";
import RegisterPage from "./pages/RegisterPage";

services.setup();

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(services.isAuthenticated);
    const NavbarWithRouter = withRouter(Navabar);
    return (
        <authContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}>
        <HashRouter>
            <Provider store={store}>
                <NavbarWithRouter />
                <main className="container pt-4">
                    <Switch>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/register" component={RegisterPage}/>
                        <PrivateRoute path="/invoices/:id" component={InvoicePage}/>
                        <PrivateRoute path="/invoices" component={InvoicesPage}/>
                        <PrivateRoute path="/customers/:id" component={CustomerPage}/>
                        <PrivateRoute path="/customers" component={CustomersPage}/>
                        <Route path="/" component={HomePage}/>
                    </Switch>
                </main>
            </Provider>
        </HashRouter>
        </authContext.Provider>
    );
};

export default App;

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement)

