import React from 'react';
import './OrderDetails.css';

export default function OrderDetails(props) {
    const {orderId, handleClose} = props;

  return (
    <div className='oderDetailsMain'>
        <h1 style={{color:'white', fontSize:'25px', display:'flex'}}>
        <p onClick={handleClose} className='closeButton'>X</p>
        Numer : {orderId}
        </h1>
        
    </div>
  )
}
