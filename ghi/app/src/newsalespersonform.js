import React, { useState } from "react";
import './allforms.css';

function SalesPersonForm() {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [employeeID, setEmployeeID] = useState('');

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const handleEmployeeIDChange = (event) => {
        setEmployeeID(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            first_name,
            last_name,
            employee_id: employeeID,
        };

        const url = 'http://localhost:8090/api/salespeople/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setFirstName('');
            setLastName('');
            setEmployeeID('');
        }
    }

    return (
        <div className="background-container">
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4 custom-form">
                    <h1>Add a Salesperson</h1>
                    <form onSubmit={handleSubmit} id="create-salesperson-form">
                        <div className="form-floating mb-3">
                            <input
                                value={first_name}
                                onChange={handleFirstNameChange}
                                placeholder="First Name"
                                required
                                type="text"
                                name="first_name" // Align with Django model
                                id="first_name"
                                className="form-control"
                            />
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value={last_name}
                                onChange={handleLastNameChange}
                                placeholder="Last Name"
                                required
                                type="text"
                                name="last_name" // Align with Django model
                                id="last_name"
                                className="form-control"
                            />
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value={employeeID}
                                onChange={handleEmployeeIDChange}
                                placeholder="Employee ID"
                                required
                                type="text"
                                name="employeeID"
                                id="employeeID"
                                className="form-control"
                            />
                            <label htmlFor="employeeID">Employee ID</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
}

export default SalesPersonForm;