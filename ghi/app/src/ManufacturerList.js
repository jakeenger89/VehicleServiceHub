import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './alllists.css';

function ManufacturerList(props) {
    const [manufacturers, setManufacturers] = useState([]);

    async function getManufacturers() {
        const response = await fetch('http://localhost:8100/api/manufacturers/');
        if (response.ok) {
            const { manufacturers } = await response.json();
            setManufacturers(manufacturers);
            console.log(manufacturers)
        } else {
            console.error("An error occured fetching the data")
        }
    }

    useEffect(() => {
        getManufacturers();
    }, []);

    return (
        <div className="gap-3 p-2 mt-3 background-container">
        <>
            <h1>Manufacturers</h1>
            <Link to="/manufacturers/create/" className="btn btn-primary btn-md">Add a Manufacturer</Link>
            <table className="table table-striped custom-table">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturers.map((manufacturer, index) => {
                        return (
                            <tr key={manufacturer.id + index}>
                                <td>{manufacturer.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
        </div>
    );
}

export default ManufacturerList;
