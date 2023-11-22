import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import "./DriverPageTest.css";
import { MdDelete } from "react-icons/md";
export default function DriverPageTest() {
    const [clientsData, setClientsData] = useState([]);
    useEffect(()=> {
      axios.get('https://localhost:7099/Drivers').then((Response)=> {
        setClientsData(Response.data);
      })
    }, []);
    
    const drivers = [
        { id: 1, idZam: "1" ,name: 'Jan Kowalski', company: 'Transport Sp. z o.o.', phone: '123-456-789', nip: '1234567890' },
        { id: 2, idZam: "1" ,name: 'Anna Nowak', company: 'Logistics Plus', phone: '987-654-321', nip: '0987654321' },
        { id: 3, idZam: "1" ,name: 'Anna Nowak', company: 'Logistics Plus', phone: '987-654-321', nip: '0987654321' },
        { id: 4, idZam: "1" ,name: 'Anna Nowak', company: 'Logistics Plus', phone: '987-654-321', nip: '0987654321' },
        { id: 5, idZam: "1" ,name: 'Anna Nowak', company: 'Logistics Plus', phone: '987-654-321', nip: '0987654321' },

        // Tutaj możesz dodać więcej danych kierowców
      ];

      if (!Array.isArray(clientsData)) {
        // Handle the case where clientsData is not an array (could be null, object, or something else)
        return <p>No data available</p>; // Or any other appropriate action or UI
      }
  return (
    <>
    <div className='driverPage'>
    <NavBar/>
    <h1 className='cardTitle'>Driver</h1>
    <div className='tableDriver'>
    <table className='driverTable'>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID_zam</th>
            <th>Name</th>
            <th>Company</th>
            <th>Phone</th>
            <th>NIP</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clientsData.map((client) => (
            <tr key={client.idKlient}>
              <td>{client.idKlient}</td>
              <td>{client.zamowienia.map((order) => (
              <li key={order.idZamowienie}>
                  {order.idZamowienie}
              </li>
            ))}</td>
              <td>{client.kierowca}</td>
              <td>{client.firma}</td>
              <td>{client.telefon}</td>
              <td>{client.nip}</td>
              <td style={{textAlign:'center'}}><MdDelete  size={25}  color='red'/></td>
            </tr>
          ))}
        </tbody>
      </table>      
      
      </div>
      </div>
    </>
  )
}
