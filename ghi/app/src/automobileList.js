import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AutomobileList() {
    const [automobiles, setAutomobiles ] = useState([]);
    const fetchData = async () => {
        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="gap-3 p-2 mt-3">
            <h1>Automobiles</h1>
            <Link to="/automobiles/create" className="btn btn-primary btn-md">Add A New Automobile</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                        <th>Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {automobiles.map((automobile) => {
                        return (
                            <tr key={automobile.id} value={automobile.id}>
                                <td>{automobile.vin}</td>
                                <td>{automobile.color}</td>
                                <td>{automobile.year}</td>
                                <td>{automobile.model.name}</td>
                                <td>{automobile.manufacturer?.name}</td>
                                <td>{automobile.sold}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

}

export default AutomobileList;
