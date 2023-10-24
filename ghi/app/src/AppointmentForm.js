import React, { useEffect, useState } from 'react';

function AppointmentForm(props) {

    const [VinName, setVinName] = useState('');
    const handleVinChange = (event) => {
        const value = event.target.value;
        setVinName(value);
    }

    const [CustomerName, setCustomerName] = useState('');
    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomerName(value);
    }

    const [DateTime, setDateTime] = useState('');
    const handleDateTime = (event) => {
        const value = event.target.value;
        setDateTime(value);
    }

    const [Reason, setReason] = useState('');
    const handleReasonChange = (event) => {
        const value = event.target.value;
        setReason(value);
    }

    const [TechnicianName, setTechnicianName] = useState('');
    const handleTechnicianChange = (event) => {
        const value = event.target.value;
        setTechnicianName(value);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.vin = VinName;
        data.customer = CustomerName;
        data.date_time = DateTime;
        data.technician = TechnicianName;
        data.reason = Reason;
        console.log(data);

        const appointmentUrl = "http://localhost:8080/api/appointments/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
            const newHat = await response.json();
            console.log(newHat);

            setVinName('');
            setCustomerName('');
            setDateTime('');
            setTechnicianName('');
            window.location.reload()
        }
    }

    const [technicians, setTechnician] = useState([]);
    const fetchData = async () => {
        const url = "http://localhost:8080/api/technicians/";

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setTechnician(data.technicians);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a Service Appointment</h1>
                    <form onSubmit={handleSubmit} id="create-conference-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleVinChange} placeholder="Vin" value={VinName} required type="text" name="vin" id="vin" className="form-control" />
                            <label htmlFor="vin">Automobile VIN</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleCustomerChange} placeholder="Customer" value={CustomerName} required type="text" name="customer" id="customer" className="form-control" />
                            <label htmlFor="customer">Customer</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleDateTime} placeholder="DateTime" value={DateTime} required type="datetime-local" name="date_time" id="date_time" className="form-control" />
                            <label htmlFor="date_time">Date and Time</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleTechnicianChange} required id="technician" value={TechnicianName} name="technician" className="form-select">
                                <option value="">Choose a Technician</option>
                                {technicians.map((technician, index) => {
                                    return (
                                        <option key={technician.id + index} value={technician.id}>
                                            {technician.first_name} {technician.last_name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleReasonChange} placeholder="Reason" value={Reason} required type="text" name="reason" id="reason" className="form-control" />
                            <label htmlFor="reason">Reason</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default AppointmentForm;
