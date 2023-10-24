import React, { useState } from "react";


function SalesPersonForm() {

    const [name, setName] = useState('');
    const [employeeID, setEmployeeID] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleEmployeeIDChange = (event) => {
        setEmployeeID(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.name = name;
        data.employee_id = employeeID;

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

            setName('');
            setEmployeeID('');
        }
    }
    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a sales person</h1>
                        <form onSubmit={handleSubmit} id="create-salesperson-form">
                            <div className="form-floating mb-3">
                                <input
                                    value={name}
                                    onChange={handleNameChange}
                                    placeholder="Name"
                                    required type="text"
                                    name="name"
                                    id="name"
                                     className="form-control"
                                />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    value={employeeID}
                                    onChange={handleEmployeeIDChange}
                                    placeholder="EmployeeID"
                                    required type="text"
                                    name="employeeID"
                                    id="employeeID"
                                    className="form-control" />
                                <label htmlFor="employeeID">Employee ID</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SalesPersonForm;
