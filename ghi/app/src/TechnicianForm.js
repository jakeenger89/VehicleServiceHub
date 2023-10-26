import React, { useState } from 'react';
import './allforms.css';

function TechnicianForm(props) {
    const [firstName, setFirstName] = useState('');
    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }

    const [lastName, setLastName] = useState('');
    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    }

    const [employeeId, setEmployeeId] = useState('');
    const handleEmployeeIdChange = (event) => {
        const value = event.target.value;
        setEmployeeId(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.employee_id = employeeId;
        data.first_name = firstName;
        data.last_name = lastName;
        console.log(data);

        const technicianUrl = "http://localhost:8080/api/technicians/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(technicianUrl, fetchConfig);
        if (response.ok) {
            const newTechnician = await response.json();
            console.log(newTechnician);

            setFirstName('');
            setLastName('');
            setEmployeeId('');
            window.location.reload()
        }
    }

    return (
        <div className="row background-container">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4 custom-form">
                    <h1>Add a technician</h1>
                    <form onSubmit={handleSubmit} id="technician-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleFirstNameChange} placeholder="First name" value={firstName} required type="text" name="first_name" id="first_name" className="form-control" />
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleLastNameChange} placeholder="Last name" value={lastName} required type="text" name="last_name" id="last_name" className="form-control" />
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleEmployeeIdChange} placeholder="Employee Id" value={employeeId} required type="text" name="employee_id" id="employee_id" className="form-control" />
                            <label htmlFor="employee_id">Employee ID</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default TechnicianForm;
