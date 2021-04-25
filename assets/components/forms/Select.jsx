import React from 'react';

function Select({label, name, value, onChange, children, error = ""}) {
    return (
        <div className="form-group">
            <label htmlFor="customer">{label}</label>
            <select value={value} onChange={onChange} name={name} id={name} className={"form-control" + (error && " is-invalid")}>
                {children}
            </select>
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
    );
}

export default Select;
