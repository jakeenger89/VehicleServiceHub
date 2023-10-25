import React, { useState, useEffect } from 'react';

const SalesPersonHistory = () => {
    const [salespersons, setSalespersons] = useState([]);
    const [sales, setSales] = useState([]);
    const [selectedSalesperson, setSelectedSalesperson] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8090/api/salespeople/')
            .then(response => response.json())
            .then(data => setSalespersons(data.salespeople || []))
            .catch(err => console.log(err));

        fetch('http://localhost:8090/api/sales/')
            .then(response => response.json())
            .then(data => setSales(data.sales || []))
            .catch(err => console.log(err));
    }, []);

    const handleSalespersonChange = (event) => {
        setSelectedSalesperson(salespersons.find(s => s.id === Number(event.target.value)));
    }


    return (
        <div>
            <h1>Salesperson History</h1>
            <select onChange={handleSalespersonChange}>
                <option>Select a salesperson...</option>
                {salespersons.map((salesperson) => (
                    <option key={salesperson.id} value={salesperson.id}>
                        {salesperson.first_name} {salesperson.last_name}
                    </option>
                ))}
            </select>
            {selectedSalesperson && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Employee ID</th>
                            <th scope="col">Sales History</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>{selectedSalesperson.first_name}</td>
                            <td>{selectedSalesperson.last_name}</td>
                            <td>{selectedSalesperson.employee_id}</td>
                            <td>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Customer</th>
                                            <th scope="col">Automobile VIN</th>
                                            <th scope="col">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sales.filter(sale => sale.salesperson.id === selectedSalesperson.id).map((sale, index) => (
                                            <tr key={sale.id}>
                                                <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                                <td>{sale.automobile.vin}</td>
                                                <td>{sale.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SalesPersonHistory;
