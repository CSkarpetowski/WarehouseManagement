import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import "./Order.css";
import OrderDetails from './OrderDetails';
import { useGlobalState} from './GlobalVariables';

export default function Order() {
  const [clientsData, setClientsData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [companyName, setCompanyName] = useState(null);  
  const [language] = useGlobalState('language');
  

  useEffect(() => {
    try {
      axios.get('https://localhost:7099/Drivers/ForDrivers').then((Response) => {
        setClientsData(Response.data);
        
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  function openOrderDetails(idZam, companyName) {
    setShowDetails(true);
    setOrderId(idZam);
    setCompanyName(companyName);  
  }

  function closeOrderDetails() {
    setShowDetails(false);
  }

  if (!Array.isArray(clientsData)) {
    return <p>No data available</p>;
  }

  const renderPolish = () => { //Render PL
    return (
      <>
        {showDetails && <OrderDetails orderId={orderId} companyName={companyName} handleClose={closeOrderDetails} />}
        <div className='driverPage'>
          <NavBar />
          <h1 className='cardTitle'>Zamówienia</h1>
          <div className='tableDriver'>
            <table className='driverTable'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ID_Zam</th>
                  <th>Imie</th>
                  <th>Firma</th>
                  <th>Telefon</th>
                  <th>NIP</th>
                </tr>
              </thead>
              <tbody>
                {clientsData.length > 0 ? (
                  clientsData.map((client) => (
                    <tr key={client.idKlient}>
                      <td>{client.idKlient}</td>
                      <td style={{ display: 'flex' }}>
                        {client.zamowienia.map((order) => (
                          <li key={order.idZamowienie}>
                            <button onClick={() => openOrderDetails(order.idZamowienie, client.firma)} className='orderButton'>
                              {order.idZamowienie}
                            </button>
                          </li>
                        ))}
                      </td>
                      <td>{client.kierowca}</td>
                      <td>{client.firma}</td>
                      <td>{client.telefon}</td>
                      <td>{client.nip}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">Brak danych</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  const renderEnglish = () => { //Render EN
    return (
      <>
        {showDetails && <OrderDetails orderId={orderId} companyName={companyName} handleClose={closeOrderDetails} />}
        <div className='driverPage'>
          <NavBar />
          <h1 className='cardTitle'>Orders</h1>
          <div className='tableDriver'>
            <table className='driverTable'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ID_Order</th>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Phone</th>
                  <th>NIP</th>
                </tr>
              </thead>
              <tbody>
                {clientsData.length > 0 ? (
                  clientsData.map((client) => (
                    <tr key={client.idKlient}>
                      <td>{client.idKlient}</td>
                      <td style={{ display: 'flex' }}>
                        {client.zamowienia.map((order) => (
                          <li key={order.idZamowienie}>
                            <button onClick={() => openOrderDetails(order.idZamowienie, client.firma)} className='orderButton'>
                              {order.idZamowienie}
                            </button>
                          </li>
                        ))}
                      </td>
                      <td>{client.kierowca}</td>
                      <td>{client.firma}</td>
                      <td>{client.telefon}</td>
                      <td>{client.nip}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  return ( //Sprawdzenie czy PL czy EN
    <>
      {language === "PL" ? renderPolish() : renderEnglish()}
    </>
  );
}