import React from 'react';

function Pagination({currentPage, itemsPerPage, onPageChange, length}) {

    const pagesCount = Math.ceil(length/itemsPerPage);
    const pages = [];
    for (let i=1; i<=pagesCount; i++) {
        pages.push(i)
    }
    return (
        <>
            <div>
                <ul className="pagination">
                    <li className={"page-item" + (currentPage === 1 && " disabled")}>
                        <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>&laquo;</button>
                    </li>
                    {
                        pages.map(page => {
                            return (
                                <li key={page} className={"page-item " + (currentPage === page && "active")}>
                                    <button className="page-link" onClick={() => onPageChange(page)}>
                                        {page}
                                    </button>
                                </li>
                            )
                        })
                    }
                    <li className={"page-item" + (currentPage === pagesCount && " disabled")}>
                        <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>&raquo;</button>
                    </li>
                </ul>
            </div>
        </>
    );
}

Pagination.getData = (currentPage, itemsPerPage, items) => {
    const start = currentPage*itemsPerPage - itemsPerPage;
    return items.slice(start, start + itemsPerPage);
}

export default Pagination;
