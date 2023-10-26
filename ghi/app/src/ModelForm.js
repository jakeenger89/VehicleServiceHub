import React, { useState, useEffect } from 'react';
import './allforms.css';

function ModelForm(props) {
    const [ModelName, setModelName] = useState('');
    const handleModelNameChange = (event) => {
        const value = event.target.value;
        setModelName(value);
    }

    const [PictureUrl, setPictureUrl] = useState('');
    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }

    const [Manufacturer, setManufacturer] = useState('');
    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.name = ModelName;
        data.picture_url = PictureUrl;
        data.manufacturer_id = Manufacturer;
        console.log(data);

        const modelUrl = "http://localhost:8100/api/models/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(modelUrl, fetchConfig);
        if (response.ok) {
            const newManufacturer = await response.json();
            console.log(newManufacturer);

            setModelName('');
            setPictureUrl('');
            setManufacturer('');
            window.location.reload()
        }
    }
    const [manufacturers, setManufacturers] = useState([]);
    const fetchData = async () => {
        const url = "	http://localhost:8100/api/manufacturers/";

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setManufacturers(data.manufacturers);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="row background-container">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4 custom-form">
                    <h1>Create a vehicle model</h1>
                    <form onSubmit={handleSubmit} id="technician-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleModelNameChange} placeholder="Model Name" value={ModelName} required type="text" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Model Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePictureUrlChange} placeholder="Picture URL" value={PictureUrl} required type="text" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Picture URL</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleManufacturerChange} required id="manufacturer_id" value={Manufacturer} name="manufacturer_id" className="form-select">
                                <option value="">Choose a Manufacturer</option>
                                {manufacturers.map((manufacturer, index) => {
                                    return (
                                        <option key={manufacturer.id + index} value={manufacturer.id}>
                                            {manufacturer.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default ModelForm;
