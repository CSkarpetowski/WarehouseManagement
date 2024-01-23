import React from 'react';
import NavBar from './NavBar';
import './ProductPage.css';
import productDetails from '../img/productDetails.jpg';
import axios from 'axios';

export default function ProductPage() {
    axios.get("https://localhost:7099/api/produkt/1")
    .then((response) => {
        const data = response.data;
       
        document.getElementById('productName').value = data.nazwa || '';
        document.getElementById('productQuantity').value = data.ilosc || '';
        document.getElementById('productLOT').value = data.lot || '';
        document.getElementById('productWarehouse').value = String(data.pIdMagazyn) || '';      
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  return (
    <>
      <div className='productPage'>
        <NavBar />
        <h1 className='cardTitle'>ProductDetails</h1>
        <div className='productArea'>
          <div className='leftSideForm'>
            <img src={productDetails} style={{ width: '260%' }} alt='Product' />
          </div>
          <div className='productForm'>
            <h2 style={{ textAlign: 'center' }}>Informacje o produkcie</h2>
            <div>
              <label>Nazwa produktu</label>
              <input
                type='text'
                id='productName'
                className='productInput'
               
                readOnly
              />
            </div>
            <div>
              <label>Ilość</label>
              <input
                type='number'
                id='productQuantity'
                className='productInput'
               
                readOnly
              />
            </div>
            <div>
              <label>LOT</label>
              <input
                type='text'
                id='productLOT'
                className='productInput'
                
                readOnly
              />
            </div>
            <div>
              <label>Numer magazynu</label>
              <input
                type='text'
                id='productWarehouse'
                className='productInput'
               
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
