import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import "./Order.css";
import { MdDelete } from "react-icons/md";
import OrderDetails from './OrderDetails';
export default function Order() {
    const [clientsData, setClientsData] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [orderId, setOrderId] = useState(0);
    useEffect(()=> {
      try{
        axios.get('https://localhost:7099/Drivers').then((Response)=> {
          setClientsData(Response.data);
        })
      }
      catch (err){
          console.log(err);
      }
    }, []);
    
    function openOrderDetails(idZam)
    {
      setShowDetails(true);
      setOrderId(idZam);
    }
    function closeOrderDetails()
    {
      setShowDetails(false);
    }

      if (!Array.isArray(clientsData)) {
        return <p>No data available</p>; 
      }

  return (
    <>
    {showDetails && <OrderDetails orderId={orderId} handleClose={closeOrderDetails}/>}
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
              <td style={{display:'flex'}} >{client.zamowienia.map((order) => (
              <li key={order.idZamowienie}>
              <button onClick={() => openOrderDetails(order.idZamowienie)} className='orderButton'>{order.idZamowienie}</button>
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
