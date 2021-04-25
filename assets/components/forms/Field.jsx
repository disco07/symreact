import React from 'react';

function Field({name, type= "text", placeholder, label, value, onChange, error = ""}) {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input type={type}
                   value={value}
                   onChange={onChange}
                   placeholder={placeholder}
                   id={name} name={name}
                   className={"form-control" + (error && " is-invalid")}/>
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
    );
}

export default Field;
