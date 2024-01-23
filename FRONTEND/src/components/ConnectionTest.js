import React from 'react'
import axios from 'axios';
import * as signalR from '@microsoft/signalr';
import { useState, useEffect } from 'react';

export default function ConnectionTest() {

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7099/productChanged") // SignalR
        .build();

    connection.start()
        .then(() => {
            
        })
        .catch(err => console.error(err));

    connection.on("ProductChanged",()=>{
      
    }) 
}, []);


    var [connection, setConnection] = useState(null);

    const CheckOguem = () => {
        axios.get('https://localhost:7099/api/test')
          .then(response => {
            setConnection(response.data);
          })
          .catch(error => {
            console.error('Błąd:', error);
          });
    }
  
  return (
    <>
    <button onClick={CheckOguem}>Check SignalR</button>
    <div style={{color:'red',textAlign:'center'}}>{connection}</div>
    </>
  )
}
