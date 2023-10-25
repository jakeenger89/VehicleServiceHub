import React, { useState, useEffect } from 'react';

const SalesPersonHistory = () => {
    const [salespersons, setSalespersons] = useState([]);
    const [sales, setSales] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [selectedSalesperson, setSelectedSalesperson] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8090/api/salespeople/')
            .then(response => response.json())
            .then(data => setSalespersons(data.salesperson || []))
            .catch(err => console.log(err));

        fetch('http://localhost:8090/api/sales/')
            .then(response => response.json())
            .then(data => setSales(data.sales || []))
            .catch(err => console.log(err));

        fetch('http://localhost:8090/api/customers/')
            .then(response => response.json())
            .then(data => setCustomers(data.customers || []))
            .catch(err => console.log(err));
    }, []);

    const handleSalespersonChange = (event) => {
        const selectedEmployeeId = event.target.value;
        const selectedPerson = salespersons.find(salesperson => salesperson.employee_id === selectedEmployeeId);
        setSelectedSalesperson(selectedPerson);
    };

    return (
        <div>
            <h1>Salesperson History</h1>
            <select onChange={handleSalespersonChange}>
                <option>Select a salesperson...</option>
                {salespersons.map((salesperson) => (
                    <option key={salesperson.employee_id} value={salesperson.employee_id}>
                        {salesperson.first_name} {salesperson.last_name}
                    </option>
                ))}
            </select>
            {selectedSalesperson && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Salesperson</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Automobile VIN</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.filter((sale) => sale.salesperson === selectedSalesperson.employee_id).map((sale) => {
                            const customer = customers.find((customer) => customer.id === sale.customer);
                            const formattedPrice = `$${sale.price.toFixed(2)}`; // Format price

                            return (
                                <tr key={sale.id}>
                                    <td>{selectedSalesperson.first_name} {selectedSalesperson.last_name}</td>
                                    <td>{customer ? `${customer.first_name} ${customer.last_name}` : 'N/A'}</td>
                                    <td>{sale.automobile}</td>
                                    <td>{formattedPrice}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SalesPersonHistory;