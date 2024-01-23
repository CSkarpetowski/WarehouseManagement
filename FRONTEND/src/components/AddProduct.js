import React, {} from 'react';
import './AddProduct.css';
import NavBar from './NavBar';
import formImage from '../img/addProductimg.jpg';
import axios from 'axios';
import {useGlobalState, setGlobalState} from './GlobalVariables';
import checkjwt from './CheckJwt.js';


export default function AddProduct() {
  

  function addProductDB() {
    checkjwt();
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
         setGlobalState('signalChange',true);
        })
        .catch((err) => {
          if(err.response != undefined){
            alert(err.response.data)  
          }
          
        });
    }
  }




  function generateLOT() //Automatyczna generacja LOT
  {
    
    if (document.getElementById('addProductName').value === undefined || document.getElementById('addProductName').value === null || document.getElementById('addProductName').value == ""){
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

  function checkLotinbase(lot){
    axios.get(`https://localhost:7099/api/produkt/GetAllLot/${lot}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => alert("Coś poszło nie tak!"));
  }

  function lot(){
    let lot = false;
    while(lot == false){
      
    generateLOT();
    let lotToCheck = document.getElementById('addProductLOT').value;
    lot = checkLotinbase(lotToCheck);
    }
  }

  const [language] = useGlobalState('language');
   
  const resetProductAdded = () => {
   
   setGlobalState('signalChange',false);
  };

  const renderPolish = () => {
    return(
      <div className='addProductPage'>
      <h1 className='cardTitle'>Dodaj Produkt</h1>
      
      <NavBar />
      <div className='addProductArea'>
        <div className='leftSideForm'><img src={formImage} style={{ width: '160%' }} /></div>
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
    )
  }
  const renderEnglish = () => { //Render EN
    return(
      <div className='addProductPage'>
      <h1 className='cardTitle'>Add Product</h1>
      
      <NavBar />
      <div className='addProductArea'>
        <div className='leftSideForm'><img src={formImage} style={{ width: '160%' }} /></div>
        <div className='addProductForm'>
        <h2 style={{textAlign:'center'}} >Insert product data</h2>
        <div><input type='text' placeholder='Name' id='addProductName' /></div>
        <div><input type='number' placeholder='Quantity' id='addProductQuantity' onFocus={lot}/></div>
        <div><input type='text' placeholder='LOT' id='addProductLOT' disabled/></div>
        <div>
          <select id='addProductIdWarehouse' name='addProductIdWarehouse'>
            <option value={1}>Warehouse nr1</option>
            <option value={2}>Warehouse nr2</option>
            <option value={3}>Warehouse nr3</option>
          </select>
        </div>
        <button id='productButton' onClick={addProductDB}>Add Product</button>
        </div>
      </div>
    </div>
    )
  }

  return ( //Sprawdzenie czy PL czy EN
    <>
    {language == "PL" ? renderPolish() : renderEnglish()}

    </>
  );}
