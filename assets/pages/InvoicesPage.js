import React, {useEffect, useState} from 'react';
import Pagination from "../components/Pagination";
import {deleteInvoices, fetchInvoices} from "../redux/action/action";
import {connect} from "react-redux";
import moment from "moment";

function InvoicesPage({invoices, fetchInvoices, deleteInvoices}) {

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

    const status = {
        "PAID": "success",
        "SENT": "primary",
        "CANCELLED": "danger"
    }

    const statusWord = {
        "PAID": "Payée",
        "SENT": "Envoyée",
        "CANCELLED": "Annulée"
    }

    useEffect(() => {
        fetchInvoices()
    }, [fetchInvoices])

    const handleDelete = (id) => {
        deleteInvoices(id);
    }
    const itemsPerPage = 20;

    const handleChangePage = (page) => {
        setCurrentPage(page);
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    }

    const filteredInvoices = invoices.items.filter(
        i =>
            i.user.firstName.toLowerCase().includes(search.toLowerCase()) ||
            i.user.lastName.toLowerCase().includes(search.toLowerCase()) ||
            i.amount.toString().toLowerCase().startsWith(search.toLowerCase()) ||
            statusWord[i.status].toLowerCase().includes(search.toLowerCase())
    )

    const paginatedInvoices = Pagination.getData(currentPage, itemsPerPage, filteredInvoices);

    return (
        <>
            <h1>Liste des factures</h1>
            <div className="form-group">
                <input type="text"
                       className="form-control"
                       placeholder="Rechercher un client"
                       value={search} onChange={handleSearch}/>
            </div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Numéro</th>
                    <th>Client</th>
                    <th className="text-center">Date d'envoi</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Montant</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {paginatedInvoices.map((invoice, index) => {
                    return (
                        <tr key={index}>
                            <td>{invoice.id}</td>
                            <td><a href="#">{invoice.user.firstName + " " + invoice.user.lastName}</a></td>
                            <td className="text-center">{moment(invoice.sentAt).format("DD/MM/YYYY")}</td>
                            <td className="text-center">
                                <span
                                    className={"badge " + "badge-"+status[invoice.status]}>{statusWord[invoice.status]}</span>
                            </td>
                            <td className="text-center">{invoice.amount.toLocaleString()} €</td>
                            <td>
                                <button
                                    onClick={() => handleDelete(invoice.id)}
                                    className="btn btn-sm btn-success mr-1">Editer
                                </button>
                                <button
                                    onClick={() => handleDelete(invoice.id)}
                                    className="btn btn-sm btn-danger">Supprimer
                                </button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            {
                filteredInvoices.length > itemsPerPage &&
                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredInvoices.length}
                            onPageChange={handleChangePage}/>
            }
        </>
    );
}

const mapStateToProps = state => {
    return {
        invoices: state.invoices
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchInvoices: () => dispatch(fetchInvoices()),
        deleteInvoices: (id) => dispatch(deleteInvoices(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoicesPage);
