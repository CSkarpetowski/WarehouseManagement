import React, { useState, useEffect } from 'react';
import './AddProduct.css';
import NavBar from './NavBar';
import formImage from '../img/addProductimg.jpg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useGlobalState, setGlobalState} from './NoteAlert';

export default function AddProduct() {
  
  function addProductDB() {
    let queryFlag = false;
    let productMame = document.getElementById('addProductName').value;
    let productQuantity = document.getElementById('addProductQuantity').value;
    let productLOT = document.getElementById('addProductLOT').value;
    let productWarehouse = document.getElementById('addProductIdWarehouse').value;

    if (productMame == null || productQuantity == null || productLOT == null || productWarehouse == null) {
      alert("Coś poszło nie tak!");
      queryFlag = false;
    } else {
      queryFlag = true;
    }

    if (queryFlag) {
      axios.post("https://localhost:7099/api/produkt/", {
        "nazwa": productMame,
        "lot": productLOT,
        "ilosc": productQuantity,
        "isGood": true,
        "pIdMagazyn": productWarehouse
      })
        .then((response) => {
          alert("Produkt dodano pomyślnie !");
         // setNotification({ showNotification: true }); // Set productAdded to true when product is added
         setGlobalState('signalChange',true);
        })
        .catch((err) => alert("Coś poszło nie tak!"));
    }
  }
  const resetProductAdded = () => {
   // setNotification({ showNotification: false });
   setGlobalState('signalChange',false);
  };

  return (
    <>
      <div className='addProductPage'>
        <h1 className='cardTitle'>AddProduct</h1>
        {/* Pass the callback function to reset productAdded to NavBar */}
        <NavBar />
        <div className='addProductArea'>
          <div className='leftSideForm'><img src={formImage} style={{ width: '160%' }} /></div>
          <div className='addProductForm'>
            <h2 style={{ textAlign: 'center' }} >Wprowadź dane produktu</h2>
            <div><input type='text' placeholder='Nazwa' id='addProductName' /></div>
            <div><input type='number' placeholder='Ilosc' id='addProductQuantity' /></div>
            <div><input type='text' placeholder='LOT' id='addProductLOT' /></div>
            <div>
              <select id='addProductIdWarehouse' name='addProductIdWarehouse'>
                <option value={1}>Magazyn nr1</option>
                <option value={2}>Magazyn nr2</option>
                <option value={3}>Magazyn nr3</option>
              </select>
            </div>
            <button id='productButton' onClick={addProductDB}>Dodaj produkt</button>
          </div>
        </div>
      </div>
    </>
  );
}
