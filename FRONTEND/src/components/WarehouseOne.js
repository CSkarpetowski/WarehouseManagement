import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import './WarehouseOne.css';

const WarehouseOne = () => {
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
  return (
    <div id='mainPage'>
      <NavBar />
      <h1 className='cardTitle'>- Warehouse 1 - </h1>
      <div className='warehouseArea'>
        <table className='orderTable'>
          <thead>
            <tr>
              <th>Wybór</th>
              <th>ID</th>
              <th>IsOld</th>
              <th>ID Klienta</th>
            </tr>
          </thead>
          <tbody className='table'>
           
              <tr>
                <td>
                  <input
                    type='checkbox'/>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
          </tbody>
        </table>
        <div className='buttonContainer'>
          <button>Apply checkbox</button>
        </div>
      </div>
    </div>
  );
};

export default WarehouseOne;