import React, { useEffect, useState } from 'react';
import './WarehouseOne.css';
import NavBar from './NavBar';
import axios from 'axios';
export default function WarehouseOne() {

    const[warehouseData, SetWarehouseData] = useState([]);

  useEffect(()=>{
      try{
        axios.get("https://localhost:7099/api/produkt/all/1")
        .then((response) => {
          SetWarehouseData(response.data);
          console.log(warehouseData);
        })
      }
      catch (err)
      {
        console.log(err);
      }
  },[]);

  const alertValidation = (event) =>{
     let checkbox = event.target;
     let productID = checkbox.id;
     if(checkbox.checked)
     {
      try{
        axios.patch(`https://localhost:7099/api/produkt/${productID}`, {isGood:true})
        .then(() => {
          console.log("Pomyslnie zaktualizowano isGood");
        })
      }
      catch (err){
          console.log(err);
      } 
      }
}

  return (
    <div id='mainPage'>
      <NavBar/>
      <h1 className='cardTitle'>- Warehouse 1 -</h1>
      <div className='warehouseArea'>
        <table className='orderTable'>
          <thead>
            <tr style={{textAlign:'center'}}>
              <th>ID Prod</th>
              <th>Nazwa</th>
              <th>LOT</th>
              <th>Ilość palet</th>
              <th>Alert</th>
            </tr>
          </thead>
          <tbody className='table'>
              {
                warehouseData && warehouseData.map((val) =>(
                  <tr key={val.idProd} style={{backgroundColor: val.isGood ? 'white' : 'red'}}>
                    <td>{val.idProd}</td>
                    <td>{val.nazwa}</td>
                    <td>{val.lot}</td>
                    <td>{val.ilosc}</td>
                    <td><input id={val.idProd} type='checkbox' onClick={alertValidation} /></td>
                  </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
