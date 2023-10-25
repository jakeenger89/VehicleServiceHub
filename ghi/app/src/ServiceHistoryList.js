import { useState, useEffect } from 'react';

function SalespersonHistory() {
  const [salesperson, setSalesperson] = useState(0);
  const [SalesFiltered, setSalesFiltered] = useState([]);
  const [salespeople, setSalespeople] = useState([]);

  useEffect(() => {
    // Add your code to fetch salespeople and filtered sales data here
  }, []);

  const handleSalespersonChange = (event) => {
    const selectedSalesperson = parseInt(event.target.value);
    setSalesperson(selectedSalesperson);

    // Filter your sales data based on the selected salesperson
    const filteredSales = yourFilteringLogic(selectedSalesperson);
    setSalesFiltered(filteredSales);
  };

  return (
    <div className="shadow p-4 mt-4">
      <h1>Salesperson History</h1>
      <select
        onChange={handleSalespersonChange}
        value={salesperson}
        name="salesperson"
        id="salesperson"
        className="form-select"
      >
        <option value="0">Filter Salesperson</option>
        {salespeople.map((salesperson) => (
          <option key={salesperson.id} value={salesperson.id}>
            {salesperson.first_name} {salesperson.last_name}
          </option>
        ))}
      </select>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Salesperson</th>
            <th>Customer</th>
            <th>Automobile</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {SalesFiltered.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
              <td>{sale.customer.first_name} {sale.customer.last_name}</td>
              <td>{sale.automobile.vin}</td>
              <td>{sale.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalespersonHistory;