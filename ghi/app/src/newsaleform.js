import React, { useState, useEffect } from 'react';

function NewSaleForm({  }) {
  const [autos, setAutos] = useState([]);
  const [salespersons, setSalespersons] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedAuto, setSelectedAuto] = useState('');
  const [selectedSalesperson, setSelectedSalesperson] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetch('http://localhost:8100/api/automobiles/')
      .then((response) => response.json())
      .then((data) => setAutos(data.autos.filter((auto) => !auto.sold) || [])) // Filter out sold automobiles
      .catch((err) => console.log(err));

    fetch('http://localhost:8090/api/salespeople/')
      .then((response) => response.json())
      .then((data) => setSalespersons(data.salesperson || []))
      .catch((err) => console.log(err));

    fetch('http://localhost:8090/api/customers/')
      .then((response) => response.json())
      .then((data) => setCustomers(data.customers || []))
      .catch((err) => console.log(err));
  }, []);

  // limit user input to 10 for price because its throwing an error
  const handlePriceChange = (event) => {
    const inputValue = event.target.value;
    const trimmedValue = inputValue.slice(0, 9);
    setPrice(trimmedValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const sale = {
      automobile: selectedAuto,
      salesperson: selectedSalesperson,
      customer: selectedCustomer,
      price,
    };

    const response = await fetch('http://localhost:8090/api/sales/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sale),
    });

    if (response.ok) {
      setSelectedAuto('');
      setSelectedSalesperson('');
      setSelectedCustomer('');
      setPrice('');
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Record a new sale</h1>
          <form onSubmit={handleSubmit} id="create-sale-form">
            <div className="form-floating mb-3">
              <select
                value={selectedAuto}
                onChange={(e) => setSelectedAuto(e.target.value)}
                className="form-select"
                id="automobile"
                required
              >
                <option value="">Choose an autombile VIN...</option>
                {autos.map((auto) => (
                  <option key={auto.vin} value={auto.vin}>
                    {auto.vin}
                  </option>
                ))}
              </select>
              <label htmlFor="automobile">Automobile VIN</label>
            </div>
            <div className="form-floating mb-3">
              <select
                value={selectedSalesperson}
                onChange={(e) => setSelectedSalesperson(e.target.value)}
                className="form-select"
                id="salesperson"
                required
              >
                <option value="">Choose a salesperson...</option>
                {salespersons.map((person) => (
                  <option key={person.employee_id} value={person.employee_id}>
                    {person.first_name} {person.last_name}
                  </option>
                ))}
              </select>
              <label htmlFor="salesperson">Salesperson</label>
            </div>
            <div className="form-floating mb-3">
              <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="form-select"
                id="customer"
                required
              >
                <option value="">Choose a customer...</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.first_name} {customer.last_name}
                  </option>
                ))}
              </select>
              <label htmlFor="customer">Customer</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                value={price}
                onChange={handlePriceChange}
                placeholder="Price"
                required
                className="form-control"
                id="price"
              />
              <label htmlFor="price">Price (up to 9 digits)</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewSaleForm;