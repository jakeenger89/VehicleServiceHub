import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './alllists.css';


function TechnicianList(props) {
    const [technicians, setTechnicians] = useState([]);

    async function getTechnicians() {
        const response = await fetch('http://localhost:8080/api/technicians/');
        if (response.ok) {
            const { technicians } = await response.json();
            setTechnicians(technicians);
            console.log(technicians)
        } else {
            console.error("An error occured fetching the data")
        }
    }

    useEffect(() => {
        getTechnicians();
    }, []);

    return (
        <div className="gap-3 p-2 mt-3 background-container">
        <>
            <h1>Technicians</h1>
            <Link to="/technicians/add" className="btn btn-primary btn-md">Add a Technician</Link>
            <table className="table table-striped custom-table">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {technicians.map((technician, index) => {
                        return (
                            <tr key={technician.id + index}>
                                <td>{technician.employee_id}</td>
                                <td>{technician.first_name}</td>
                                <td>{technician.last_name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
        </div>
    );
}

export default TechnicianList;
