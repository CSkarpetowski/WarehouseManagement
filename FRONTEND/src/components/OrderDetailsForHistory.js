import React, { useEffect, useState } from 'react';
import './OrderDetailsForHistory.css';
import axios from 'axios';

export default function OrderDetailsForHistory(props) {
    const {orderId, handleClose} = props;
    const [orderDetails, setOrderDetails] = useState([]);
    useEffect( () =>{
      try{
        axios.get(`https://localhost:7099/api/zamowienie/details/${orderId}`)
        .then( (response) => {
          const orderDataArray = [response.data];
          setOrderDetails(orderDataArray[0]);
          
        });
      }
      catch (err){
          console.log(err);
      }
    },[orderId]);

  return (
    <div className='oderDetailsMain'>
        <h1 className='orderWindowBar'>
        <p onClick={handleClose} className='closeButton'>X</p>
        Client ID :  {orderId}
        </h1>
        <div className='oderDetailsTableArea'>

        <p style={{color:'white',
         fontSize:'30px',
          textAlign:'center',
           fontFamily:'Roboto, Helvetica, sans-serif',
           margin:'0'}} >
            Order details</p>

        <table className='orderDetailsTable'>
          <thead>
            <tr>
            <th>Nazwa</th>
            <th>Quantity</th>
            <th>LOT</th>
            <th>WarehouseID</th>
            </tr>
          </thead>
          <tbody>
              { orderDetails.length > 0 && orderDetails.map((det) => (
              <tr key={det.lpZamowienie}>
                <td>{det.produkty.nazwa}</td>
                <td>{det.ilosc}</td>
                <td>{det.lot}</td>
                <td>{det.produkty.pIdMagazyn}</td>
              </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
  )
}
