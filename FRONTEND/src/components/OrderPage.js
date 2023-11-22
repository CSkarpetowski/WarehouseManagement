import React, { useState } from 'react';
import NavBar from './NavBar';
import './OrderPage.css';

const OrderPage = () => {
  const initialTableData = [
    { id: 1, productName: "dwumasa", productId: "1", lot: "1245", ilosc: 0, isChecked: false },
    { id: 2, productName: "tłok", productId: "2", lot: "8561", ilosc: 0, isChecked: false },
    { id: 3, productName: "sprzęgło", productId: "3", lot: "5732", ilosc: 0, isChecked: false },
  ];

  const [tableData, setTableData] = useState(initialTableData);
  const [selectedOrders, setSelectedOrders] = useState([]);

  const handleCheckboxChange = (id) => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, isChecked: !row.isChecked } : row
      )
    );

    setSelectedOrders((prevSelected) => {
      const isSelected = prevSelected.includes(id);
      return isSelected
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id];
    });
  };

  const handleQuantityChange = (id, value) => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, ilosc: value } : row
      )
    );
  };

  const handleAddOrder = () => {
    console.log("Dodaj zamówienie:", tableData);
    setTableData(initialTableData);
  };

  const handleCancel = () => {
    setTableData(initialTableData);
  };


  return (
    <div id='mainPage'>
      <NavBar />
      <h1 className='cardTitle'>Dodaj zamówienie</h1>
      <div className='warehouseArea'>
        <table className='orderTable'>
          <thead>
            <tr>
              <th>Wybór</th>
              <th>Produkty</th>
              <th>ID produktu</th>
              <th>LOT</th>
              <th>Ilość palet</th>
            </tr>
          </thead>
          <tbody className='table'>
            {tableData.map((row) => (
              <tr id='orderList' key={row.id}>
                <td>
                  <input
                    type='checkbox'
                    checked={row.isChecked}
                    onChange={() => handleCheckboxChange(row.id)}
                  />
                </td>
                <td>{row.productName}</td>
                <td>{row.productId}</td>
                <td>{row.lot}</td>
                <td>
                  <input
                    type='number'
                    value={row.ilosc}
                    onChange={(e) =>
                      handleQuantityChange(row.id, e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='buttonContainer'>
        <select>
            <option value='Magazyn 1'>Magazyn 1</option>
            <option value='Magazyn 2'>Magazyn 2</option>
            <option value='Magazyn 3'>Magazyn 3</option>
          </select>
          <button onClick={handleAddOrder}>Dodaj</button>
          <button onClick={handleCancel}>Anuluj</button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;