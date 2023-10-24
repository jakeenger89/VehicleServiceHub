import { useState, useEffect } from 'react';


function AppointmentList(props) {
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

    const cancelAppointment = async (id) => {
        await updateAppointmentStatus(id, 'canceled');
    };

    const finishAppointment = async (id) => {
        await updateAppointmentStatus(id, 'finished');
    };

    const updateAppointmentStatus = async (id, status) => {
        const appointmentUrl = `http://localhost:8080/api/appointments/${id}`

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

    useEffect(() => {
        getAppointments();
    }, []);

    return (
        <>
            <h1>Service Appointments</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        {/* <th>Is VIP?</th> */}
                        <th>Customer</th>
                        <th>Date and Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
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
    );
}

export default AppointmentList;
