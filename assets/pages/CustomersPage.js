import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {deleteCustomers, fetchCustomers} from "../redux/action/action";
import Pagination from "../components/Pagination";
import {Link} from "react-router-dom";
import TableLoader from "../components/loader/TableLoader";

function CustomersPage({customers, fetchCustomer, deleteCustomers}) {

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchCustomer(localStorage.getItem('authToken'))
    }, [])

    const handleDelete = (id) => {
        deleteCustomers(id, localStorage.getItem('authToken'));
    }
    const itemsPerPage = 10;

    const handleChangePage = (page) => {
        setCurrentPage(page);
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    }

    const filteredCustomers = customers.items.filter(
        c =>
            c.firstName.toLowerCase().includes(search.toLowerCase()) ||
            c.lastName.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase()) ||
            (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
    )

    const paginatedCustomers = Pagination.getData(currentPage, itemsPerPage, filteredCustomers);

    return (
        <>
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <h1>Listes des clients</h1>
                <Link to="/customers/new" className="btn btn-primary"> Créer un client</Link>
            </div>
            <div className="form-group">
                <input type="text"
                       className="form-control"
                       placeholder="Rechercher un client"
                       value={search} onChange={handleSearch}/>
            </div>
            {
                customers.isLoading && <TableLoader/>
            }
            {
                !customers.isLoading &&
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Entreprise</th>
                        <th className="text-center">Factures</th>
                        <th className="text-center">Montant total</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedCustomers.map((customer, index) => {
                        return (
                            <tr key={index}>
                                <td>{customer.id}</td>
                                <td><Link to={"/customers/"+customer.id}>{customer.firstName + " " + customer.lastName}</Link></td>
                                <td>{customer.email}</td>
                                <td>{customer.company}</td>
                                <td className="text-center"><span
                                    className="badge badge-primary">{customer.invoices.length}</span></td>
                                <td className="text-center">{customer.totalAmount.toLocaleString()} €</td>
                                <td>
                                    <button
                                        disabled={customer.invoices.length > 0}
                                        onClick={() => handleDelete(customer.id)}
                                        className="btn btn-sm btn-danger">Supprimer
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            }
            {
                !customers.isLoading &&
                (filteredCustomers.length > itemsPerPage &&
                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredCustomers.length}
                            onPageChange={handleChangePage}/>)
            }
        </>
    );
}

const mapStateToProps = state =>
{
    return {
        customers: state.customer,
    }
}

const mapDispatchToProps = dispatch =>
{
    return {
        fetchCustomer: (bearer_token) => dispatch(fetchCustomers(bearer_token)),
        deleteCustomers: (id, bearer_token) => dispatch(deleteCustomers(id, bearer_token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomersPage);
