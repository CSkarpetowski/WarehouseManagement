import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import './OrderPage.css';
import axios from 'axios';

const LeftPanel = ({ tableData, tempTable, handleCheck, handleTableDataChange }) => {
  const handleRowClick = (row) => {
    handleCheck({ target: { checked: !tempTable.some(item => item.idProd === row.idProd) } }, row);
  };

  return (
    <div className="leftPanel">
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
            <tr id='orderList' key={row.idProd} onClick={() => handleRowClick(row)}>
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
                <input
                  type="number"
                  min="1"
                  max={row.ilosc}
                  value={row.ilosc}
                  onChange={(e) => handleTableDataChange(e, row)}
                />
              </td>
              <td id="idmagazyn">{row.pIdMagazyn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const RightPanel = ({ tempTable }) => {
  return (
    <div className="rightPanel">
      <table className='finalOrder'>
        <thead>
          <tr>
            <th>Produkty</th>
            <th>LOT</th>
            <th>Ilość</th>
            <th>Magazyn</th>
          </tr>
        </thead>
        <tbody className='table'>
          {tempTable.map((element, index) => (
            <tr id='finalorderList' key={index}>
              <td>{element.nazwa}</td>
              <td>{element.lot}</td>
              <td>{element.ilosc}</td>
              <td>{element.pIdMagazyn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

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

  const handleTableDataChange = (e, row) => {
    const newTableData = tableData.map(item => {
      if (item.idProd === row.idProd) {
        return { ...item, ilosc: e.target.value };
      }
      return item;
    });
    setTableData(newTableData);
  };

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
        <div className="tablesContainer">
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
};

export default OrderPage;