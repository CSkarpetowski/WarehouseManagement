import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import "./Order.css";
import { MdDelete } from "react-icons/md";
import OrderDetailsForHistory from './OrderDetailsForHistory';
import {useGlobalState, setGlobalState} from './GlobalVariables';


export default function Order() {
  const [History, setHistory] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [language,setLanguage] = useGlobalState('language');
  console.log(language);

  useEffect(() => {
    try {
      // Replace the URL with your Postman data endpoint
      axios.get('https://localhost:7099/api/zamowienie/getAllOld2').then((response) => {
        setHistory(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  function openOrderDetails(idZam) {
    setShowDetails(true);
    setOrderId(idZam);
  }

  function closeOrderDetails() {
    setShowDetails(false);
  }

  if (!Array.isArray(History)) {
    return <p>No data available</p>;
  }

  const renderPolish = () => {
  return (
    <>
      {showDetails && <OrderDetailsForHistory orderId={orderId} handleClose={closeOrderDetails} />}
      <div className='driverPage'>
        <NavBar />
        <h1 className='cardTitle'>Historia</h1>
        <div className='tableDriver'>
          <table className='driverTable'>
          <thead>
              <tr>
                <th>ID Zamówienia</th>
                <th>Data Realizacji</th>
                <th>Firma</th>
                <th>NIP</th>
                <th>Kierowca</th>
                {/* Add additional headers as needed */}
                <th></th>
              </tr>
            </thead>
            <tbody>
            {History.map((his) => (
                <tr key={his.idHistoria}>
                  <td>{his.hIdZamowienie}</td>
                  <td>{his.realizacja}</td>
                  <td>{his.zamowienie.klient.firma}</td>
                  <td>{his.zamowienie.klient.nip}</td>
                  <td>{his.zamowienie.klient.kierowca}</td>
                  {/* Add additional cells as needed */}
                  <td>
                    
                      <button onClick={() => openOrderDetails(his.zamowienie.idZamowienie)} className='orderButton'>szczegóły</button>
                    
                  </td>                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );}
  const renderEnglish = () => {
    return (
      <>
        {showDetails && <OrderDetailsForHistory orderId={orderId} handleClose={closeOrderDetails} />}
        <div className='driverPage'>
          <NavBar />
          <h1 className='cardTitle'>History</h1>
          <div className='tableDriver'>
            <table className='driverTable'>
            <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Realisation Date</th>
                  <th>Company</th>
                  <th>NIP</th>
                  <th>Driver</th>
                  {/* Add additional headers as needed */}
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {History.map((his) => (
                  <tr key={his.idHistoria}>
                    <td>{his.hIdZamowienie}</td>
                    <td>{his.realizacja}</td>
                    <td>{his.zamowienie.klient.firma}</td>
                    <td>{his.zamowienie.klient.nip}</td>
                    <td>{his.zamowienie.klient.kierowca}</td>
                    {/* Add additional cells as needed */}
                    <td>
                      
                        <button onClick={() => openOrderDetails(his.zamowienie.idZamowienie)} className='orderButton'>details</button>
                      
                    </td>                 
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );}
    return (
      <>
      {language == "PL" ? renderPolish() : renderEnglish()}
    
      </>
    );}
    


