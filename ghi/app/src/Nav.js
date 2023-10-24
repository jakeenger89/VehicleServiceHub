import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className='nav-item'>
              <NavLink className="nav-link" to="/manufacturers">Manufacturers</NavLink>
              <NavLink className="nav-link" to="/manufacturers/create">Create a Manufacturer</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/models">Models</NavLink>
              <NavLink className="nav-link" to="/models/create">Create a Model</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/automobiles">Automobiles</NavLink>
              <NavLink className="nav-link" to="/automobiles/create">Create an Automobile</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/salespeople">Salespeople</NavLink>
              <NavLink className="nav-link" to="/salespeople/add">Add a Salesperson</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/customers">Customers</NavLink>
              <NavLink className="nav-link" to="/customers/add">Add a Customer</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/sales">Sales</NavLink>
              <NavLink className="nav-link" to="/sales/add">Add a Sale</NavLink>

            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/technicians">Technicians</NavLink>
              <NavLink className="nav-link" to="/technicians/add">Add a Technician</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/service-appointments">Service Appointments</NavLink>
              <NavLink className="nav-link" to="/service-appointments/create">Create a Service Appointment</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/service-history">Service History</NavLink>
              <NavLink className="nav-link" to="/sales-history">Sales History</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;