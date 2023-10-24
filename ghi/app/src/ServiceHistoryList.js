import { useState, useEffect } from 'react';


function ServiceHistoryList(props) {
    const [appointments, setAppointment] = useState([]);

    async function getAppointments() {
        const response = await fetch('http://localhost:8080/api/appointments/');
        if (response.ok) {
            const { appointments } = await response.json();
            setAppointment(appointments);
            console.log(appointments)
        } else {
            console.error("An error occured fetching the data")
        }
    }


    useEffect(() => {
        getAppointments();
    }, []);

    return (
        <>
            <h1>Service History</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        {/* <th>Is VIP?</th> */}
                        <th>Customer</th>
                        <th>Date and Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment, index) => {
                        return (
                            <tr key={appointment.id + index}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.customer}</td>
                                <td>{appointment.date_time}</td>
                                <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                                <td> {appointment.reason}</td>
                                <td>{appointment.status}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default ServiceHistoryList;
