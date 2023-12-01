import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import "./Order.css";
import { MdDelete } from "react-icons/md";

export default function Order() {
  const [employeesData, setEmployeesData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [employeeId, setEmployeeId] = useState(0);

  useEffect(() => {
    try {
      // Replace the URL with your Postman data endpoint
      axios.get('https://localhost:7099/api/pracownik/all').then((response) => {
        setEmployeesData(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  function openEmployeeDetails(idPracownik) {
    setShowDetails(true);
    setEmployeeId(idPracownik);
  }

  function closeEmployeeDetails() {
    setShowDetails(false);
  }

  if (!Array.isArray(employeesData)) {
    return <p>No data available</p>;
  }

  return (
    <>
      {/* Add your OrderDetails component if needed */}
      {/* {showDetails && <OrderDetails employeeId={employeeId} handleClose={closeEmployeeDetails} />} */}
      <div className='driverPage'>
        <NavBar />
        <h1 className='cardTitle'>Employees</h1>
        <div className='tableDriver'>
          <table className='driverTable'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Is Manager</th>
                <th>Warehouse ID</th>
                {/* Add additional headers as needed */}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {employeesData.map((employee) => (
                <tr key={employee.idPracownik}>
                  <td>{employee.idPracownik}</td>
                  <td>{employee.nazwa}</td>
                  <td>{employee.telefon}</td>
                  <td>{employee.isManager ? 'Yes' : 'No'}</td>
                  <td>{employee.pIdMagazyn}</td>
                  {/* Add additional cells as needed */}
                  <td style={{ textAlign: 'center' }}><MdDelete size={25} color='red' /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
