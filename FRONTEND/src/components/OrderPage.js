import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import './OrderPage.css';
import axios from 'axios';

const OrderPage = () => {
  const [tableData, setTableData] = useState([]);
  const [tempTable, setTempTable] = useState([]);
  const [tempTableVisible, setTempTableVisible] = useState(true);
  const [selectedWarehouse, setSelectedWarehouse] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedWarehouse == '') {const response = await axios.get(`https://localhost:7099/api/produkt/all`);
        console.log(response.data);
        setTableData(response.data); }
        if (selectedWarehouse) {
          const response = await axios.get(`https://localhost:7099/api/produkt/all/${selectedWarehouse}`);
          console.log(response.data);
          setTableData(response.data);
        }
      } catch (error) {
        // Handle errors
      }
    };

    fetchData();
  }, [selectedWarehouse]);

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
      products: tempTable,
    });
  };

  const handleWarehouseChange = (e) => {
    console.log(e.target.value);
    setSelectedWarehouse(e.target.value);
    // No need to call fetchData here, as it's now handled by useEffect
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
                <td id="ilosc">{row.ilosc}</td>
                <td id="idmagazyn">{row.pIdMagazyn}</td>
              </tr>
            ))}
          </tbody>
        </table>

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
