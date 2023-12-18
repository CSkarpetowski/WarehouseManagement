import React from 'react';
import './AddProduct.css';
import NavBar from './NavBar';
import formImage from '../img/addProductimg.jpg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as signalR from '@microsoft/signalr';
export default function AddProduct() {

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7099/productChanged") // Replace with your SignalR endpoint
        .build();

    connection.start()
        .then(() => {
            console.log("SignalR Connected!");
        })
        .catch(err => console.error(err));

    connection.on("ProductChanged",()=>{
      console.log("Sachnik Kurwa !");
    }) 
}, []);

  function addProductDB()
  {
      let queryFlag=false; 
      let productMame=document.getElementById('addProductName').value;
      let productQuantity=document.getElementById('addProductQuantity').value;
      let productLOT=document.getElementById('addProductLOT').value;
      let productWarehouse=document.getElementById('addProductIdWarehouse').value;
      // alert(""+productMame+" "+productQuantity+" "+productLOT+" "+productWarehouse);

      if(productMame==null||productQuantity==null||productLOT==null||productWarehouse==null)
      {
        alert("Coś poszło nie tak!");
        queryFlag=false;
      }
      else
      {
        queryFlag=true;
      }

      if(queryFlag)
      {
        axios.post("https://localhost:7099/api/produkt/",{
          "nazwa": productMame,
          "lot": productLOT,
          "ilosc": productQuantity,
          "isGood": true,
          "pIdMagazyn":productWarehouse
        })
        .then((response) => {
          alert("Produkt dodano pomyślnie !");
          window.location.reload();
        })
        .catch((err)=> alert("Coś poszło nie tak!"));
      }
      
  }

  function generateLOT()
  {
    
    if (document.getElementById('addProductName').value == undefined || document.getElementById('addProductName').value == null || document.getElementById('addProductName').value == ""){
      return;
    } else{
      var prod = document.getElementById('addProductName').value;
    var lot = "";
      if (prod.split(' ').length > 1) {
  
     prod.split(' ').map((word) => {
      if (word[0] == null) return;
        word[0].toUpperCase();
        lot += word[0];
     });
     }else if(prod.length > 1) {
       lot += prod[0].toUpperCase();
       lot += prod[1].toUpperCase();
     }else{
        lot += prod[0].toUpperCase();
     }
    lot += Math.floor((Math.random()*1000) + 1000);

    document.getElementById('addProductLOT').value = lot.toUpperCase();
    }
    
    
  }    
  return (
    <>
    <div className='addProductPage'>
    <h1 className='cardTitle'>AddProduct</h1>
     <NavBar/> 
      <div className='addProductArea'>
      <div className='leftSideForm'><img src={formImage} style={{width:'160%'}}/></div>
          <div className='addProductForm'>
          <h2 style={{textAlign:'center'}} >Wprowadź dane produktu</h2>
          <div><input type='text' placeholder='Nazwa' id='addProductName' /></div>
          <div><input type='number' placeholder='Ilosc' id='addProductQuantity' onFocus={generateLOT}/></div>
          <div><input type='text' placeholder='LOT' id='addProductLOT' disabled/></div>
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
  )
}
