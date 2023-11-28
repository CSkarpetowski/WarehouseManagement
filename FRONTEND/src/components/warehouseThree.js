import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import './WarehouseThree.css';
import { MdDelete } from "react-icons/md";
import axios from 'axios';

const WarehouseThree = () => {
  const [tableData, setTableData] = useState([]);

 // let KlientId = document.getElementById('KlientId').value;
  //let idprod = document.getElementById('idprod').value;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7099/api/produkt/all/3');
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
      <h1 className='cardTitle'>- Warehouse 3 -</h1>
      <div className='warehouseArea'>
        <table className='orderTable'>
          <thead>
            <tr>
              <th>ID Prod</th>
              <th>Produkty</th>
              <th>LOT</th>
              <th>Ilość palet</th>
              <th></th>
            </tr>
          </thead>
          <tbody className='table'>
            {tableData && tableData.map((row) => (
              <tr id='orderList' key={row.idProd}>
                <td id='idprod' value={row.idProd}>{row.idProd}</td>
                <td id="nazwa" value={row.nazwa}>{row.nazwa}</td>
                <td id="lot" value={row.lot}>{row.lot}</td>
                <td id="ilosc" value={row.ilosc}>{row.ilosc}</td>
                <td style={{textAlign:'center'}}><MdDelete  size={25}  color='red'/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WarehouseThree;