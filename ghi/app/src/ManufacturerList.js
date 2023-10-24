import { useState, useEffect } from 'react';


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
        <>
            <h1>Manufacturers</h1>
            <table className="table table-striped">
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
    );
}

export default ManufacturerList;
