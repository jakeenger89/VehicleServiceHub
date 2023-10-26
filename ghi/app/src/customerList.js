import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './alllists.css';

function CustomerList() {
    const [customers, setCustomers] = useState([]);

    const fetchData = async () => {
        const response = await fetch('http://localhost:8090/api/customers/');
        if (response.ok) {
            const data = await response.json();
            // console.log(data.customers);
            setCustomers(data.customers);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="gap-3 p-2 mt-3 background-container">
            <h1>Customers</h1>
            <Link to="/customers/add" className="btn btn-primary btn-md">Add A Customer</Link>
            <table className="table table-striped custom-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => {
                        return (
                            <tr key={customer.id}>
                                <td>{customer.first_name}</td>
                                <td>{customer.last_name}</td>
                                <td>{customer.address}</td>
                                <td>{customer.phone_number}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default CustomerList;
