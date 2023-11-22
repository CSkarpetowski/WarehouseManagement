import React from 'react';
import NavBar from './NavBar';
import "./DriverPage.css";
import { MdDelete } from "react-icons/md";
export default function DriverPage() {
    const drivers = [
        { id: 1, idZam: "1" ,name: 'Jan Kowalski', company: 'Transport Sp. z o.o.', phone: '123-456-789', nip: '1234567890' },
        { id: 2, idZam: "1" ,name: 'Anna Nowak', company: 'Logistics Plus', phone: '987-654-321', nip: '0987654321' },
        { id: 3, idZam: "1" ,name: 'Anna Nowak', company: 'Logistics Plus', phone: '987-654-321', nip: '0987654321' },
        { id: 4, idZam: "1" ,name: 'Anna Nowak', company: 'Logistics Plus', phone: '987-654-321', nip: '0987654321' },
        { id: 5, idZam: "1" ,name: 'Anna Nowak', company: 'Logistics Plus', phone: '987-654-321', nip: '0987654321' },

        // Tutaj możesz dodać więcej danych kierowców
      ];
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
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td>{driver.id}</td>
              <td>{driver.idZam}</td>
              <td>{driver.name}</td>
              <td>{driver.company}</td>
              <td>{driver.phone}</td>
              <td>{driver.nip}</td>
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
