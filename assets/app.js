import React from 'react';
import ReactDOM from 'react-dom';
import Navabar from "./components/Navabar";
import HomePage from "./pages/HomePage";
import {HashRouter, Switch, Route} from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import store from "./redux/store";
import {Provider} from "react-redux";
import InvoicesPage from "./pages/InvoicesPage";

const App = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <Navabar/>
                <main className="container pt-4">
                    <Switch>
                        <Route path="/invoices" component={InvoicesPage}/>
                        <Route path="/customers" component={CustomersPage}/>
                        <Route path="/" component={HomePage}/>
                    </Switch>
                </main>
            </Provider>
        </HashRouter>
    );
};

export default App;

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement)

