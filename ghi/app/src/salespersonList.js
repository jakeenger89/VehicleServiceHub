import React, { useEffect, useState } from "react";

function SalesPersonList() {
    const [salesperson, setSalesPerson] = useState([]);
    const [selectedsalesperson, setSelectedSalesPerson] = useState('');
    const [sales, setSales] = useState([]);

    const fetchSalesPerson = async () => {
        const url = "http://localhost:8090/api/salespeople/"
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSalesPerson(data.salesperson);
        }
    };

    const fetchSales = async () => {
        const url = 'http://localhost:8090/api/sales/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSales(data.sales);
        }
    };
    const handleSalesPersonChange =(event) => {
        setSelectedSalesPerson(event.target.value);
    };

    useEffect(() => {
        fetchSales();
        fetchSalesPerson();
    }, []);

    return (
        <div className="row">
            <h1 className="gap=3 p-4 mt-4"> Sales People List</h1>
            <div className="mb-3">
                <select
                    onChange={handleSalesPersonChange}
                    value={selectedsalesperson}
                    id="salesperson"
                    name="salesperson"
                    className="form-select"
                    required>

                    <option value="">Choose a Salesperson</option>
                    {salesperson.map((salespersons) => {
                        return (
                            <option key={salespersons.id} value={salespersons.id}>
                                {salespersons.id}
                            </option>
                        );
                    })}
                </select>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Salesperson</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => {
                        return (
                            <tr key={sale.id}>
                                <td>{sale.salesperson}</td>
                                <td>{sale.customer}</td>
                                <td>{sale.vin}</td>
                                <td>{sale.price}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default SalesPersonList;
