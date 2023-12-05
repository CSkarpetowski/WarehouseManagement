import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import "./Order.css";
import { RiMailAddFill } from "react-icons/ri";
import { hover } from '@testing-library/user-event/dist/hover';

export default function Order() {
  const [employeesData, setEmployeesData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [employeeId, setEmployeeId] = useState(0);
  const [showMailPopUp, setShowMailPopUp] = useState(false);
  const [userMailId, setUserMailId] = useState();

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

  const MailPopUp = () => {
    return(
      <div style={{position:'absolute',
       backgroundColor:'#0d2730',
        top:'15%',
        padding:'2%',
        overflow:'auto',
        border:'3px solid #c87cfc',
        left:'20%',
        width:'60vw',
        height:'55vh'}}>
        <p style={{fontSize:'35px',
         textAlign:'end',
         fontWeight:'500',
         cursor:'pointer',
          fontFamily:'system-ui'}} onClick={()=>setShowMailPopUp(false)}>X</p>
          <h3 style={{color:'white'}}>Napisz maila do :   {userMailId}</h3>
          <textarea id='mailContent' style={{width:'98%',
          marginLeft:'0 0 15px',
          height:'50%',
          resize:'none',
          padding:'1%',
          outline:'0',
          fontFamily:'Comfortaa',
          fontSize:'20px'}}></textarea>
          <button onClick={async ()=>{
           const MailText = await String(document.getElementById('mailContent').value);
           alert(MailText); // Gruby czarodzieju tu masz gotowca tylko w mail wyslac uzyj:
            // async await-> na gorze masz przyklad  O========3
          }}>Wyślij!</button>
      </div>
    );
  }

  return (
    <>
      {/* Add your OrderDetails component if needed */}
      {/* {showDetails && <OrderDetails employeeId={employeeId} handleClose={closeEmployeeDetails} />} */}
      <div className='driverPage'>
        <NavBar />
        {showMailPopUp ? MailPopUp() : null}
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
                  <td style={{ textAlign: 'center' }} onClick={() => {
                    setShowMailPopUp(true)
                    setUserMailId(employee.nazwa)
                    }}>
                      <RiMailAddFill size={30} color={'#0078a0c2'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
