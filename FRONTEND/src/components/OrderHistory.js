import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import "./Order.css";
import { format } from 'date-fns';
import OrderDetailsForHistory from './OrderDetailsForHistory';
import {useGlobalState} from './GlobalVariables';


export default function Order() {
  const [History, setHistory] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [language] = useGlobalState('language');
  console.log(language);

  useEffect(() => {
    try {
      
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

  const renderPolish = () => { //Render PL
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
                <th></th>
              </tr>
            </thead>
            <tbody>
            {History.map((his) => (
                <tr key={his.idHistoria}>
                  <td>{his.hIdZamowienie}</td>
                  <td>{format(new Date(his.realizacja), 'HH:mm dd-MM-yyyy')}</td> 
                  <td>{his.zamowienie.klient.firma}</td>
                  <td>{his.zamowienie.klient.nip}</td>
                  <td>{his.zamowienie.klient.kierowca}</td>
                  <td>
                    
                      <button onClick={() => openOrderDetails(his.zamowienie.idZamowienie)} className='orderButton'>Szczegóły</button>
                    
                  </td>                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );}
  const renderEnglish = () => { //Render EN
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {History.map((his) => (// Format Daty
                  <tr key={his.idHistoria}>
                    <td>{his.hIdZamowienie}</td>
                    <td>{format(new Date(his.realizacja), 'HH:mm dd-MM-yyyy')}</td> 
                    <td>{his.zamowienie.klient.firma}</td>
                    <td>{his.zamowienie.klient.nip}</td>
                    <td>{his.zamowienie.klient.kierowca}</td>
                    <td>
                      
                        <button onClick={() => openOrderDetails(his.zamowienie.idZamowienie)} className='orderButton'>Details</button>
                      
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
    


