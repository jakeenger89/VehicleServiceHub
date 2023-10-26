import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './alllists.css';

function SalesList() {
  const [sales, setSales] = useState([]);

  async function fetchData() {
    try {
      const salesResponse = await fetch("http://localhost:8090/api/sales/");
      if (!salesResponse.ok) {
        console.error(salesResponse);
        return;
      }
      const salesData = await salesResponse.json();

      // need to get the names of sales people and custoemr and the vin to display on list
      const salespersonResponse = await fetch("http://localhost:8090/api/salespeople/");
      const salespersonData = await salespersonResponse.json();

      const customersResponse = await fetch("http://localhost:8090/api/customers/");
      const customersData = await customersResponse.json();

      const automobilesResponse = await fetch("http://localhost:8100/api/automobiles/");
      const automobilesData = await automobilesResponse.json();

      const enrichedSalesData = salesData.sales.map((sale) => {
        const salesperson = salespersonData.salesperson.find(person => person.employee_id === sale.salesperson);
        const customer = customersData.customers.find(cust => cust.id === sale.customer);
        const automobile = automobilesData.autos.find(auto => auto.vin === sale.automobile);

        return {
          id: sale.id,
          price: sale.price,
          salespersonId: sale.salesperson,
          salespersonName: `${salesperson.first_name} ${salesperson.last_name}`,
          customerName: `${customer.first_name} ${customer.last_name}`,
          vehicleVIN: automobile.vin,
        };
      });

      setSales(enrichedSalesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="gap-3 p-2 mt-3 background-container">
      <h1>Sales</h1>
      <Link to="/sales/add" className="btn btn-primary btn-md">
        New Sale?
      </Link>
      <table className="table table-striped custom-table">
        <thead>
          <tr>
            <th>Salesperson Employee ID</th>
            <th>Salesperson Name</th>
            <th>Customer</th>
            <th>Vin</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.salespersonId}</td>
              <td>{sale.salespersonName}</td>
              <td>{sale.customerName}</td>
              <td>{sale.vehicleVIN}</td>
              <td>{`$${(sale.price / 100).toFixed(2)}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesList;