import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianList from './TechnicianList';
import TechnicianForm from './TechnicianForm';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import CustomerForm from './newcustomerform';
import CustomerList from './customerList';
import SalesPersonForm from './newsalespersonform';
import SalesPersonList from './salespersonList';
import ModelList from './modelList';
import ModelForm from './ModelForm';
import AutomobileForm from './automobileForm';
import AutomobileList from './automobileList';
import SalesList from './salesList';
import NewSaleForm from './newsaleform';
import SalesPersonHistory from './salespersonHistoryList';
import ServiceHistoryList from './ServiceHistoryList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="technicians">
            <Route path="" element={<TechnicianList />} />
            <Route path="add" element={<TechnicianForm />} />
          </Route>
          <Route path="service-appointments">
            <Route path="" element={<AppointmentList />} />
            <Route path="create" element={<AppointmentForm />} />
          </Route>
          <Route path="manufacturers">
            <Route path="" element={<ManufacturerList />} />
            <Route path="create" element={<ManufacturerForm />} />
          </Route>
          <Route path="customers">
            <Route path="" element={<CustomerList />} />
            <Route path="add" element={<CustomerForm />} />
          </Route>
          <Route path="salespeople">
            <Route path="" element={<SalesPersonList />} />
            <Route path="add" element={<SalesPersonForm />} />
          </Route>
          <Route path="models">
            <Route path="" element={<ModelList />} />
            <Route path="create" element={<ModelForm />} />
          </Route>
          <Route path="automobiles">
            <Route path="" element={<AutomobileList />} />
            <Route path="create" element={<AutomobileForm />} />
          </Route>
          <Route path="sales">
            <Route path="" element={<SalesList />} />
            <Route path="add" element={<NewSaleForm />} />
          </Route>
          <Route path="sales-history">
            <Route path="" element={<SalesPersonHistory />} />
          </Route>
          <Route path="service-history">
            <Route path="" element={<ServiceHistoryList />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
