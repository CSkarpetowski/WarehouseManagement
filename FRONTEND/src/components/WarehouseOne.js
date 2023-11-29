<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> c0b7d046a414d10815adfbfdbea52dd9b1095c9d
import NavBar from './NavBar';
import axios from 'axios';
import './WarehouseOne.css';
import { MdDelete } from "react-icons/md";
import axios from 'axios';

const WarehouseOne = () => {
<<<<<<< HEAD
    useEffect(()=>{
        try{
            axios.get("https://localhost:7099/api/produkt/all/1")
            .then((response) => {
              console.log(response.data);
            })
        }
        catch (err){
            console.log(err);
        }
    },[]);
=======
  const [tableData, setTableData] = useState([]);

 // let KlientId = document.getElementById('KlientId').value;
  //let idprod = document.getElementById('idprod').value;

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

>>>>>>> c0b7d046a414d10815adfbfdbea52dd9b1095c9d
  return (
    <div id='mainPage'>
      <NavBar />
      <h1 className='cardTitle'>- Warehouse 1 -</h1>
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
<<<<<<< HEAD
           
              <tr>
                <td>
                  <input
                    type='checkbox'/>
                </td>
                <td></td>
                <td></td>
                <td></td>
=======
            {tableData && tableData.map((row) => (
              <tr id='orderList' key={row.idProd}>
                <td id='idprod' value={row.idProd}>{row.idProd}</td>
                <td id="nazwa" value={row.nazwa}>{row.nazwa}</td>
                <td id="lot" value={row.lot}>{row.lot}</td>
                <td id="ilosc" value={row.ilosc}>{row.ilosc}</td>
                <td style={{textAlign:'center'}}><MdDelete  size={25}  color='red'/></td>
>>>>>>> c0b7d046a414d10815adfbfdbea52dd9b1095c9d
              </tr>
          </tbody>
        </table>
<<<<<<< HEAD
        <div className='buttonContainer'>
          <button>Apply checkbox</button>
        </div>
=======
>>>>>>> c0b7d046a414d10815adfbfdbea52dd9b1095c9d
      </div>
    </div>
  );
};

export default WarehouseOne;