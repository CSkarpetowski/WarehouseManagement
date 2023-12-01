import React, { useEffect, useState } from 'react';
import './WarehouseOne.css';
import NavBar from './NavBar';
import axios from 'axios';
export default function WarehouseOne() {

  const [warehouseData, setWarehouseData] = useState([]);

  useEffect(() => {
    try {
      axios.get("https://localhost:7099/api/produkt/all/1")
        .then((response) => {
          setWarehouseData(response.data);
          console.log(response.data); // Logujemy dane, a nie stan przed aktualizacją
        })
    } catch (err) {
      console.log(err);
    }
  }, []);

  const alertValidationOK = (event) =>{
     let button = event.target;
     let buttonID = button.id;
      try{
        axios.patch(`https://localhost:7099/api/produkt/isGood/${buttonID}`, {isGood:true})
        .then(() => {
          console.log("Pomyslnie zaktualizowano isGood TRUE ");
          window.location.reload();
        })
         }
      catch (err){
          console.log(err);
      } 
}

const alertValidationNOK = (event) =>{
  let button = event.target;
  let buttonID = button.id;
   try{
     axios.patch(`https://localhost:7099/api/produkt/isGood/${buttonID}`, {isGood:false})
     .then(() => {
       console.log("Pomyslnie zaktualizowano isGood FALSE ");
       window.location.reload();
     })
      }
   catch (err){
       console.log(err);
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
                    <td>
                      <button style={{width:'25%', backgroundColor:'green', margin:'2px'}} id={val.idProd} onClick={alertValidationOK}></button>
                      <button style={{width:'25%', backgroundColor:'tomato', margin:'2px'}} id={val.idProd} onClick={alertValidationNOK}></button>
                    </td>
                  </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
