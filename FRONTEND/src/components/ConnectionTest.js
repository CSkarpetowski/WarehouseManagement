import React from 'react'
import axios from 'axios';
import * as signalR from '@microsoft/signalr';
import { useState, useEffect } from 'react';

export default function ConnectionTest() {

  const signalRConnection = new signalR.HubConnectionBuilder()
  .withUrl('/productChanged')
  .build();

signalRConnection.start().catch((error) => console.error(error));

function checkSignalR()
{
  signalRConnection.on('ProductChanged')
  {
    alert("YES!");
    signalRConnection.stop();
  } 
}


    var [connection, setConnection] = useState(null);

    useEffect(() => {
        axios.get('https://localhost:7099/api/test')
          .then(response => {
            setConnection(response.data);
          })
          .catch(error => {
            console.error('Błąd:', error);
          });
      }, []);

  return (
    <>
    <div style={{color:'red',textAlign:'center'}}>{connection}</div>
    <button onClick={checkSignalR}>Check SignalR</button>
    </>
  )
}
