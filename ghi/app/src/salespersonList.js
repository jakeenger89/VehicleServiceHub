import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './alllists.css';

function SalesPeopleList() {
  const [salesPeople, setSalesPeople] = useState([]);

  async function fetchData() {
    const response = await fetch("http://localhost:8090/api/salespeople/");
    if (response.ok) {
      const data = await response.json();
      const salespeople = data.salesperson; // Access the 'salespeople' array
      setSalesPeople(Array.isArray(salespeople) ? salespeople : []); // Ensure it's an array
    } else {
      console.error(response);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="gap-3 p-2 mt-3 background-container">
      <h1>Salespeople</h1>
      <Link to="/salespeople/add" className="btn btn-primary btn-md">
        Add a new Salesperson
      </Link>
      <table className="table table-striped custom-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {salesPeople.map((salesperson) => (
            <tr key={salesperson.employee_id}>
              <td>{salesperson.employee_id}</td>
              <td>{salesperson.first_name}</td>
              <td>{salesperson.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesPeopleList;