import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import './OrderPage.css';
import axios from 'axios';

const OrderPage = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7099/api/produkt/all/1');
        console.log(response.data);
        setTableData(response.data);
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error('Server responded with a non-success status:', error.response.status);
          console.error('Response data:', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received from the server');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up the request:', error.message);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div id='mainPage'>
      <NavBar />
      <h1 className='cardTitle'>Dodaj zamówienie</h1>
      <div className='warehouseArea'>
        <table className='orderTable'>
          <thead>
            <tr>
              <th>Wybór</th>
              <th>Produkty</th>
              <th>LOT</th>
              <th>Ilość palet</th>
              <th>Magazyn</th>
            </tr>
          </thead>
          <tbody className='table'>
            {tableData && tableData.map((row) => (
              <tr id='orderList' key={row.idProd}>
                <td>
                  <input type='checkbox' />
                </td>
                <td>{row.nazwa}</td>
                <td>{row.lot}</td>
                <td>{row.ilosc}</td>
                <td>{row.pIdMagazyn}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='buttonContainer'>
          <select>
            <option value='Magazyn 1'>Kierowca 1</option>
            <option value='Magazyn 2'>Kierowca 2</option>
            <option value='Magazyn 3'>Kierowca 3</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;