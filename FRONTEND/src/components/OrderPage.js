import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import './OrderPage.css';
import axios from 'axios';
import {useGlobalState, setGlobalState} from './GlobalVariables';
import checkjwt from './CheckJwt';


const LeftPanel = ({ tableData, tempTable, handleCheck, handleTableDataChange }) => {
  const handleRowClick = (row) => {
    handleCheck({ target: { checked: !tempTable.some(item => item.idProd === row.idProd) } }, row);
  };
  const [language] = useGlobalState('language');
  

  const renderPolish = () => { //Render PL
  return (
    <div className="orderleftPanel">
      <table className='orderTable'>
        <thead>
          <tr>
            <th>Wybór</th>
            <th>Produkty</th>
            <th>LOT</th>
            <th className='itemQuantity'>Ilość palet</th>
            <th>Magazyn</th>
          </tr>
        </thead>
        <tbody className='table'>
          {tableData && tableData.map((row) => (
            <tr id='orderList' key={row.idProd}>
              <td id='idprod' value={row.idProd} onClick={() => handleRowClick(row)}>
                <input
                  type='checkbox'
                  onChange={(e) => handleCheck(e, row)}
                  checked={tempTable.some(item => item.idProd === row.idProd)}
                />
              </td>
              <td id="nazwa" onClick={() => handleRowClick(row)}>{row.nazwa}</td>
              <td id="lot" onClick={() => handleRowClick(row)}>{row.lot}</td>
              <td className='itemQuantity'>
                <input
                  type="number"
                  min="1"
                  max={row.ilosc}
                  value={row.ilosc}
                  onChange={(e) => handleTableDataChange(e, row)}
                  
                />
              </td >
              <td id="idmagazyn" onClick={() => handleRowClick(row)}>{row.pIdMagazyn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );}
  const renderEnglish = () => { //Render EN
    return (
      <div className="orderleftPanel">
        <table className='orderTable'>
          <thead>
            <tr>
              <th>Choose</th>
              <th>Products</th>
              <th>LOT</th>
              <th className='itemQuantity'>Quantity</th>
              <th>Warehouse</th>
            </tr>
          </thead>
          <tbody className='table'>
            {tableData && tableData.map((row) => (
              <tr id='orderList' key={row.idProd}>
                <td id='idprod' value={row.idProd} onClick={() => handleRowClick(row)}>
                  <input
                    type='checkbox'
                    onChange={(e) => handleCheck(e, row)}
                    checked={tempTable.some(item => item.idProd === row.idProd)}
                  />
                </td>
                <td id="nazwa" onClick={() => handleRowClick(row)}>{row.nazwa}</td>
                <td id="lot" onClick={() => handleRowClick(row)}>{row.lot}</td>
                <td className='itemQuantity'>
                  <input
                    type="number"
                    min="1"
                    max={row.ilosc}
                    value={row.ilosc}
                    onChange={(e) => handleTableDataChange(e, row)}
                    
                  />
                </td >
                <td id="idmagazyn" onClick={() => handleRowClick(row)}>{row.pIdMagazyn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );}
    return ( //Sprawdzenie czy wybrany jest PL czy EN
      <>
      {language == "PL" ? renderPolish() : renderEnglish()}
    
      </>
    );
};


const RightPanel = ({ tempTable }) => { //Prawy Panel
  const [language, setLanguage] = useGlobalState('language');
  
  const renderPolish = () => {
  return (
    <div className="orderrightPanel">
      <table className='finalOrder'>
        <thead>
          <tr>
            <th className='productName'>Produkty</th>
            <th className='tableLOT'>LOT</th>
            <th>Ilość</th>
            <th>Magazyn</th>
          </tr>
        </thead>
        <tbody className='table'>
          {tempTable.map((element, index) => (
            <tr id='finalorderList' key={index}>
              <td className='productName'>{element.nazwa}</td>
              <td>{element.lot}</td>
              <td>{element.ilosc}</td>
              <td>{element.pIdMagazyn}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{margin: 15}}>Jeśli ilość dodana do zamówienia przekracza ilość dostępną na stanie, dodawana jest tylko dostępna ilość.</p>
    </div>
  );}
  const renderEnglish = () => { //Render EN
    return (
      <div className="orderrightPanel">
        <table className='finalOrder'>
          <thead>
            <tr>
              <th className='productName'>Products</th>
              <th className='tableLOT'>LOT</th>
              <th>Quantity</th>
              <th>Warehouse</th>
            </tr>
          </thead>
          <tbody className='table'>
            {tempTable.map((element, index) => (
              <tr id='finalorderList' key={index}>
                <td className='productName'>{element.nazwa}</td>
                <td>{element.lot}</td>
                <td>{element.ilosc}</td>
                <td>{element.pIdMagazyn}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{margin: 15}}>If the quantity added to the order exceeds the quantity available in stock, only the available quantity is added.</p>
      </div>
    );}
    return ( //Sprawdzenie czy wybrany jest jezyk PL czy EN
      <>
      {language == "PL" ? renderPolish() : renderEnglish()}
    
      </>
    );
};

const OrderPage = () => {
  const [tableData, setTableData] = useState([]);
  const [tempTable, setTempTable] = useState([]);
  const [tempTableVisible, setTempTableVisible] = useState(true);
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [klient, setKlient] = useState([]);
  const [language, setLanguage] = useGlobalState('language');
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedWarehouse === '') {
          const response = await axios.get(`https://localhost:7099/api/produkt/all`);
          
          setTableData(response.data);
        }
        if (selectedWarehouse) {
          const response = await axios.get(`https://localhost:7099/api/produkt/all/${selectedWarehouse}`);
          
          setTableData(response.data);
        }
      } catch (error) {
        console.error('Błąd pobierania danych:', error);
      }
    };

    fetchData();
  }, [selectedWarehouse]);

  useEffect(() => {
    axios.get('https://localhost:7099/Drivers')
      .then((response) => {
        setKlient(response.data);
      })
      .catch((error) => {
        console.error('Błąd pobierania danych klientów:', error);
      });
  }, []);

  const handleCheck = (event, row) => {
    const updatedList = [...tempTable];

    if (event.target.checked) {
      updatedList.push(row);
    } else {
      const index = updatedList.findIndex(item => item.idProd === row.idProd);
      if (index !== -1) {
        updatedList.splice(index, 1);
      }
    }

    setTempTable(updatedList);
  };

  const handleDodajZamowienie = () => {
    console.log('Dodaj zamówienie:', {
      warehouse: selectedWarehouse,
      client: selectedClient,
      products: tempTable,
    });
    checkjwt();
    const selectedClientObject = klient.find((client) => client.idKlient === parseInt(selectedClient));

    if (selectedClientObject) {
      axios.post("https://localhost:7099/api/zamowienie/addZamowienie", {
        Produkty: tempTable,
        Klient: selectedClientObject.idKlient
      })
        .then((response) => {
          alert("Zamówienie dodano pomyślnie!");
          setGlobalState('signalChange',true);
        })
        .catch((err) => {
          if (err.response != undefined){
            alert("Coś poszło nie tak!")
          }
          
        });
    } else {
      alert("Nie znaleziono wybranego klienta!");
    }
  }
  const resetProductAdded = () => {
   
    setGlobalState('signalChange',false);
  };

  const handleWarehouseChange = (e) => {
    setSelectedWarehouse(e.target.value);
  };

  const handleClientChange = (e) => {
    setSelectedClient(e.target.value);
  };

  const handleTableDataChange = (e, row) => {
    const newTableData = tableData.map(item => {
      if (item.idProd === row.idProd) {
        return { ...item, ilosc: e.target.value };
      }
      return item;
    });
    setTableData(newTableData);
  };

  const renderPolish = () => { //Render PL
    return (
      <div id='mainPage'>
        <NavBar />
        <h1 className='cardTitle'>Dodaj zamówienie</h1>
        <div className='warehouseArea'>
          <div className='buttonContainer'>
            <label>Wybierz magazyn:</label>
            <select
              value={selectedWarehouse}
              onChange={handleWarehouseChange}
            >
              <option value=''>Wszystkie</option>
              <option value='1'>Magazyn 1</option>
              <option value='2'>Magazyn 2</option>
              <option value='3'>Magazyn 3</option>
            </select>
            <label>Wybierz klienta:</label>
            <select
              value={selectedClient}
              onChange={handleClientChange}
            >
              <option value=''>Wybierz klienta</option>
              {klient.map((client) => (
                <option key={client.idKlient} value={client.idKlient}>
                  {client.firma}
                </option>
              ))}
            </select>
            <button onClick={handleDodajZamowienie}>Dodaj zamówienie</button>
          </div>
          <div className="ordertablesContainer">
            <LeftPanel
              tableData={tableData}
              tempTable={tempTable}
              handleCheck={handleCheck}
              handleTableDataChange={handleTableDataChange}
            />
            <RightPanel tempTable={tempTable} />
          </div>
        </div>
      </div>
    );
  }
  const renderEnglish = () => { //Render EN
    return (
      <div id='mainPage'>
        <NavBar />
        <h1 className='cardTitle'>Add Order</h1>
        <div className='warehouseArea'>
          <div className='buttonContainer'>
            <label>Choose Warehouse:</label>
            <select
              value={selectedWarehouse}
              onChange={handleWarehouseChange}
            >
              <option value=''>All</option>
              <option value='1'>Warehouse 1</option>
              <option value='2'>Warehouse 2</option>
              <option value='3'>Warehouse 3</option>
            </select>
            <label>Choose client:</label>
            <select
              value={selectedClient}
              onChange={handleClientChange}
            >
              <option value=''>Choose client</option>
              {klient.map((client) => (
                <option key={client.idKlient} value={client.idKlient}>
                  {client.firma}
                </option>
              ))}
            </select>
            <button onClick={handleDodajZamowienie}>Add Order</button>
          </div>
          <div className="ordertablesContainer">
            <LeftPanel
              tableData={tableData}
              tempTable={tempTable}
              handleCheck={handleCheck}
              handleTableDataChange={handleTableDataChange}
            />
            <RightPanel tempTable={tempTable} />
          </div>
        </div>
      </div>
    );
  }
  
  

  return (
    <>
    {language == "PL" ? renderPolish() : renderEnglish()}

    </>
  );}


export default OrderPage;








