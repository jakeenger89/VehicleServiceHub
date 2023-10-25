import { useState, useEffect } from 'react';

function ServiceHistoryList(props) {
    const [appointments, setAppointments] = useState([]);
    const [searchBarText, setSearchBarText] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [automobileVins, setAutomobileVins] = useState([])


    useEffect(() => {
        getAllAppointments();
        getAutomobileVins();
    }, []);

    function handleClickSearch() {
        setSearchTerm(searchBarText);
    }

    async function getAllAppointments() {

        const response = await fetch('http://localhost:8080/api/appointments/');

        if (response.ok) {
            const { appointments } = await response.json();
            setAppointments(appointments);
            console.log(appointments)
        } else {
            console.error("An error occured fetching the data")
        }
    }

    const filteredAppointments = appointments.filter((appointment) => searchTerm.length == 0 || appointment.vin === searchTerm)

    async function getAutomobileVins() {
        const response = await fetch('http://localhost:8100/api/automobiles/');
        if (response.ok) {
            const { autos } = await response.json();
            const automobileVins = autos.map((automobile) => automobile.vin)
            setAutomobileVins(automobileVins)
        } else {
            console.error("Error getting automobile VIN")
        }
    }

    return (
        <>
            <h1>Service History</h1>
            <div className="row">
                < div className="col-8">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by VIN..."
                        value={searchBarText}
                        onChange={(e) => setSearchBarText(e.target.value)}
                    />
                </div>
                <div className="col-4">
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={handleClickSearch}
                    >
                        Search
                    </button>
                </div>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Is VIP?</th>
                        <th>Customer</th>
                        <th>Date and Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAppointments.map((appointment, index) => {
                        let isVip;
                        if (automobileVins.includes(appointment.vin)) {
                            isVip = "Yes";
                        } else {
                            isVip = "No";
                        }

                        const formattedDateTime = new Date(appointment.date_time).toLocaleString();

                        return (
                            <tr key={appointment.id + appointment.vin + index}>
                                <td>{appointment.vin}</td>
                                <td>{isVip}</td>
                                <td>{appointment.customer}</td>
                                <td>{formattedDateTime}</td>
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