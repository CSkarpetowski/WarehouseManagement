import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import './OrderPage.css';
import axios from 'axios';

const OrderPage = () => {
  const [tableData, setTableData] = useState([]);
  const [tempTable, setTempTable] = useState([]);
  const [tempTableVisible, setTempTableVisible] = useState(true);
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [klient, setKlient] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedWarehouse === '') {
          const response = await axios.get(`https://localhost:7099/api/produkt/all`);
          console.log(response.data);
          setTableData(response.data);
        }
        if (selectedWarehouse) {
          const response = await axios.get(`https://localhost:7099/api/produkt/all/${selectedWarehouse}`);
          console.log(response.data);
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

    const selectedClientObject = klient.find((client) => client.idKlient === parseInt(selectedClient));

    if (selectedClientObject) {
      axios.post("https://localhost:7099/api/zamowienie/addZamowienie", {
        Produkty: tempTable,
        Klient: selectedClientObject.idKlient
      })
        .then((response) => {
          alert("Zamówienie dodano pomyślnie!");
          window.location.reload();
        })
        .catch((err) => alert("Coś poszło nie tak!"));
    } else {
      alert("Nie znaleziono wybranego klienta!");
    }
  };

  const handleWarehouseChange = (e) => {
    setSelectedWarehouse(e.target.value);
  };

  const handleClientChange = (e) => {
    setSelectedClient(e.target.value);
  };

  return (
    <div id='mainPage'>
      <NavBar />
      <h1 className='cardTitle'>Dodaj zamówienie</h1>
      <div className='warehouseArea'>
        <div className='dropdown'>
          <label>Wybierz magazyn:</label>
          <select
            value={selectedWarehouse}
            onChange={handleWarehouseChange}
          >
            <option value=''>Wybierz magazyn</option>
            <option value='1'>Magazyn 1</option>
            <option value='2'>Magazyn 2</option>
            <option value='3'>Magazyn 3</option>
          </select>
        </div>

        <div className='dropdown'>
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
        </div>
<div id="orderPageTable">
        <table className='orderTable'>
          <thead>
            <tr>
              <th>Wybór</th>
              <th>Produkty</th>
              <th>LOT</th>
              <th>Ilość palet</th>
              <th>Magazyn</th>
            </tr>
          </thead>
          <tbody className='table'>
          {tableData && tableData.map((row) => (
  <tr id='orderList' key={row.idProd}>
    <td id='idprod' value={row.idProd}>
      <input
        type='checkbox'
        onChange={(e) => handleCheck(e, row)}
        checked={tempTable.some(item => item.idProd === row.idProd)}
      />
    </td>
    <td id="nazwa">{row.nazwa}</td>
    <td id="lot">{row.lot}</td>
    <td>
      {/* Input dla ilości palet */}
      <input
        type="number"
        min="1"
        max={row.ilosc}
        value={row.ilosc} // Początkowa wartość
        onChange={(e) => {
          const newTableData = tableData.map(item => {
            if (item.idProd === row.idProd) {
              return { ...item, ilosc: e.target.value };
            }
            return item;
          });
          setTableData(newTableData);
        }}
      />
    </td>
    <td id="idmagazyn">{row.pIdMagazyn}</td>
  </tr>
))}
          </tbody>
        </table>
        </div>

        <div className='tempTable' style={{ display: tempTableVisible ? 'block' : 'none' }}>
          <h2>Tymczasowa Tabela</h2>
          <table>
            <thead>
              <tr>
                <th>Produkty</th>
                <th>LOT</th>
                <th>Ilość</th>
                <th>Magazyn</th>
              </tr>
            </thead>
            <tbody>
              {tempTable.map((element, index) => (
                <tr key={index}>
                  <td>{element.nazwa}</td>
                  <td>{element.lot}</td>
                  <td>{element.ilosc}</td>
                  <td>{element.pIdMagazyn}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={handleDodajZamowienie}>Dodaj zamówienie</button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
