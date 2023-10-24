import React, { useState, useEffect } from 'react';

function CustomerForm({ getCustomers }) {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhoneNumber] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      first_name,
      last_name,
      address,
      phone_number,
    };

    const customerUrl = "http://localhost:8090/api/customers/";

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(customerUrl, fetchConfig);

    if (response.ok) {
      // Optionally, you can call a function to refresh the list of customers
      if (getCustomers) {
        getCustomers();
      }

      // Reset the form fields
      setFirstName('');
      setLastName('');
      setAddress('');
      setPhoneNumber('');
    }
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new Customer</h1>
          <form onSubmit={handleSubmit} id="create-customer-form">
            <div className="form-floating mb-3">
              <input
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                required
                type="text"
                name="first_name"
                id="first_name"
                className="form-control"
              />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                required
                type="text"
                name="last_name"
                id="last_name"
                className="form-control"
              />
              <label htmlFor="last_name">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                required
                type="text"
                name="address"
                id="address"
                className="form-control"
              />
              <label htmlFor="address">Address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                required
                type="text"
                name="phone_number"
                id="phone_number"
                className="form-control"
              />
              <label htmlFor="phone_number">Phone Number</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerForm;