import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './WarehousePage.css';
import NavBar from './NavBar';
import QRCode from 'qrcode.react';
import { useReactToPrint } from 'react-to-print';
import { PiPrinter } from "react-icons/pi";
import {useGlobalState, setGlobalState} from './GlobalVariables';


const WarehouseOne = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [warehouseData, setWarehouseData] = useState([]);
  const leftPanelRef = useRef();
  const [language,setLanguage] = useGlobalState('language');
  console.log(language);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7099/api/produkt/all/1");
        setWarehouseData(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const alertValidationOK = (event) => {
    let button = event.target;
    let buttonID = button.id;
    try {
      axios.patch(`https://localhost:7099/api/produkt/isGood/${buttonID}`, { isGood: true })
        .then(() => {
          console.log("Pomyslnie zaktualizowano isGood TRUE ");
          window.location.reload();
        });
    } catch (err) {
      console.log(err);
    }
  };

  const alertValidationNOK = (event) => {
    let button = event.target;
    let buttonID = button.id;
    try {
      axios.patch(`https://localhost:7099/api/produkt/isGood/${buttonID}`, { isGood: false })
        .then(() => {
          console.log("Pomyslnie zaktualizowano isGood FALSE ");
          window.location.reload();
        });
    } catch (err) {
      console.log(err);
    }
  };

  const LeftPanel = React.forwardRef(({ selectedRow }, ref) => {
    const [qrCodeValue, setQRCodeValue] = useState('');

    useEffect(() => {
      if (selectedRow) {
        const { nazwa, lot, ilosc, pIdMagazyn } = selectedRow;
        setQRCodeValue(JSON.stringify({ nazwa, lot, ilosc, pIdMagazyn }));
      }
    }, [selectedRow]);

    const decodedInfo = qrCodeValue ? JSON.parse(qrCodeValue) : null;

    return (
      <div ref={ref} className="warehouseleftPanel">
        <PiPrinter color='#c87cfc' className='printButton'onClick={handlePrintLeftPanel}/>
        {qrCodeValue ? (
          <QRCode className='qrCode' value={qrCodeValue} />
        ) : (
          <div className='qrCode' style={{ width: '128px', height: '128px', backgroundColor: 'white' }}>
          </div>
        )}
        {decodedInfo && (
          <div className='qrInfo'>
            <h2>Info QR:</h2>
            <pre>{JSON.stringify(decodedInfo, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  });

  const RightPanel = ({ warehouseData, setSelectedRow }) => {
    const renderEnglish = () => {
    return (
      <div className="warehouserightPanel">
        <table className='qrTable'>
          <thead>
            <tr style={{ textAlign: 'center' }}>
              <th>ID Prod</th>
              <th>Name</th>
              <th>LOT</th>
              <th className="itemQuantity">Quantity</th>
              <th>Alert</th>
            </tr>
          </thead>
          <tbody className='warehousetable'>
            {warehouseData.map((val) => (
              <tr key={val.idProd}
                style={{ backgroundColor: val.isGood ? 'white' : 'red', }}
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
    );}
    const renderPolish = () => {
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
                  style={{ backgroundColor: val.isGood ? 'white' : 'red', }}
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
        
      );}
      return (
        <>
        {language == "PL" ? renderPolish() : renderEnglish()}
      
        </>
      );
  };

  const handlePrintLeftPanel = useReactToPrint({
    content: () => leftPanelRef.current,
  });
  const renderPolish = () => {
  return (
    <div id='WarehousePage'>
      <NavBar />
      <h1 className='cardTitle'>- Magazyn 1 -</h1>
      <div className='warehousePageArea'>
        <div className="warehousetablesContainer">
          <LeftPanel selectedRow={selectedRow} ref={leftPanelRef} />
          <RightPanel warehouseData={warehouseData} setSelectedRow={setSelectedRow} />
        </div>
      </div>
    </div>
  );}
  const renderEnglish = () => {
    return (
      <div id='WarehousePage'>
        <NavBar />
        <h1 className='cardTitle'>- Warehouse 1 -</h1>
        <div className='warehousePageArea'>
          <div className="warehousetablesContainer">
            <LeftPanel selectedRow={selectedRow} ref={leftPanelRef} />
            <RightPanel warehouseData={warehouseData} setSelectedRow={setSelectedRow} />
          </div>
        </div>
      </div>
    );}
    return (
      <>
      {language == "PL" ? renderPolish() : renderEnglish()}
    
      </>
    );
};

export default WarehouseOne;