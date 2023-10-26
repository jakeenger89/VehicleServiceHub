import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './alllists.css';

function AppointmentList(props) {
    const [appointments, setAppointment] = useState([]);
    const [automobileVins, setAutomobileVins] = useState([])

    async function getAppointments() {
        const response = await fetch('http://localhost:8080/api/appointments/');
        if (response.ok) {
            const { appointments } = await response.json();
            const filteredAppointments = appointments.filter(appointment => appointment.status == "created");
            setAppointment(filteredAppointments);
            console.log(filteredAppointments)
        } else {
            console.error("An error occured fetching the data")
        }
    }

    const cancelAppointment = async (id) => {
        await updateAppointmentStatus(id, 'cancel');
    };

    const finishAppointment = async (id) => {
        await updateAppointmentStatus(id, 'finish');
    };

    const updateAppointmentStatus = async (id, status) => {
        const appointmentUrl = `http://localhost:8080/api/appointments/${id}/${status}/`

        try {
            const response = await fetch(appointmentUrl, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const { appointment } = await response.json();
                getAppointments();
                console.log(`Appointment ${status}:`, appointment);
            } else {
                console.error(`Failed to ${status} appointment`);
            }
        } catch (error) {
            console.error("Error", error);
        }
    };

    async function getAutomobileVins() {
        const response = await fetch('http://localhost:8100/api/automobiles/');
        if (response.ok) {
            const { autos } = await response.json();
            const automobileVins = autos.map((automobile) => automobile.vin)
            setAutomobileVins(automobileVins)
        } else {
            console.error("Error getting VIP status")
        }
    }


    useEffect(() => {
        getAppointments();
        getAutomobileVins()
    }, []);

    return (
        <div className="gap-3 p-2 mt-3 background-container">
        <>
            <h1>Service Appointments</h1>
            <Link to="/service-appointments/create" className="btn btn-primary btn-md">Make an Appointment</Link>
            <table className="table table-striped custom-table">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Is VIP?</th>
                        <th>Customer</th>
                        <th>Date and Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment, index) => {
                        let isVip;
                        if (automobileVins.includes(appointment.vin)) {
                            isVip = "Yes";
                        } else {
                            isVip = "No";
                        }
                        const formattedDateTime = new Date(appointment.date_time).toLocaleString();

                        return (
                            <tr key={appointment.id + index}>
                                <td>{appointment.vin}</td>
                                <td>{isVip}</td>
                                <td>{appointment.customer}</td>
                                <td>{formattedDateTime}</td>
                                <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                                <td> {appointment.reason}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={(e) => cancelAppointment(appointment.id)}>Cancel</button>
                                </td>
                                <td>
                                    <button className="btn btn-success" onClick={(e) => finishAppointment(appointment.id)}>Finish</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
        </div>
    );
}

export default AppointmentList;
