import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SalesList() {
  const [sales, setSales] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:8090/api/sales/");
      if (response.ok) {
        const data = await response.json();
        setSales(data.sales);
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Sales List</h1>
      <Link to="/salespeople/add" className="btn btn-primary btn-md">
        New Sale?
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Price</th>
            <th>Automobile VIN</th>
            <th>Customer ID</th>
            <th>Salesperson Employee ID</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{`$${(sale.price / 100).toFixed(2)}`}</td>
              <td>{sale.automobile}</td>
              <td>{sale.customer}</td>
              <td>{sale.salesperson}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesList;
