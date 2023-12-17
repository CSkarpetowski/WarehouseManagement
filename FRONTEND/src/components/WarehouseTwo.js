import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WarehousePage.css';
import NavBar from './NavBar';
import QRCode from 'qrcode.react';

const WarehouseTwo = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [warehouseData, setWarehouseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7099/api/produkt/all/2");
        setWarehouseData(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
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

  
  const LeftPanel = ({ selectedRow }) => {
    const [qrCodeValue, setQRCodeValue] = useState('');
  
    useEffect(() => {
      if (selectedRow) {
        const { nazwa, lot, ilosc, pIdMagazyn } = selectedRow;
        setQRCodeValue(JSON.stringify({ nazwa, lot, ilosc, pIdMagazyn }));
      }
    }, [selectedRow]);
  
    // Sprawdzenie czy nie jest null
    const decodedInfo = qrCodeValue ? JSON.parse(qrCodeValue) : null;
  
    return (
      <div className="warehouseleftPanel">
        {qrCodeValue ? (
          <QRCode className='qrCode' value={qrCodeValue} />
        ) : (
          // Jesli null to bialy kwadrat w jego miejsce
          <div className='qrCode' style={{ width: '128px', height: '128px', backgroundColor: 'white' }}>
          </div>
        )}
        {decodedInfo && (
          <div className='qrInfo'>
            <h2>Informacje w kodzie QR:</h2>
            <pre>{JSON.stringify(decodedInfo, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  };

const RightPanel = ({ warehouseData, setSelectedRow }) => {
  return (
    <div className="warehouserightPanel">
      <table className='qrTable'>
        <thead>
          <tr style={{ textAlign: 'center' }}>
            <th>ID Prod</th>
            <th>Nazwa</th>
            <th>LOT</th>
            <th className="itemQuantity">Ilość palet</th>
            <th>Alert</th>
          </tr>
        </thead>
        <tbody className='warehousetable'>
          {warehouseData.map((val) => (
            <tr key={val.idProd} 
              style={{backgroundColor: val.isGood ? 'white' : 'red',}} 
              onClick={() => setSelectedRow(val)}>
              <td>{val.idProd}</td>
              <td>{val.nazwa}</td>
              <td>{val.lot}</td>
              <td>{val.ilosc}</td>
              <td>
                <button style={{ width: '25%', backgroundColor: 'green', margin: '2px' }} id={val.idProd} onClick={alertValidationOK}></button>
                <button style={{ width: '25%', backgroundColor: 'tomato', margin: '2px' }} id={val.idProd} onClick={alertValidationNOK}></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

  return (
    <div id='WarehousePage'>
      <NavBar />
      <h1 className='cardTitle'>- Warehouse 2 -</h1>
      <div className='warehousePageArea'>
      <div className="warehousetablesContainer">
        <LeftPanel selectedRow={selectedRow} />
        <RightPanel warehouseData={warehouseData} setSelectedRow={setSelectedRow} />
      </div>
      </div>
    </div>
  );
};

export default WarehouseTwo;