import React, { useState } from 'react';
import NavBar from './NavBar';
import './OrderPage.css';

const OrderPage = () => {
  const initialTableData = [
    { id: 1, productName: "dwumasa", productId: "1", lot: "1245", ilosc: 0, warehouse: "Magazyn 1", isChecked: false },
    { id: 2, productName: "tłok", productId: "2", lot: "8561", ilosc: 0, warehouse: "Magazyn 1", isChecked: false },
    { id: 3, productName: "sprzęgło", productId: "3", lot: "5732", ilosc: 0, warehouse: "Magazyn 1", isChecked: false },
  ];

  const [tableData, setTableData] = useState(initialTableData);
  const [viewOrderList, setViewOrderList] = useState(false);
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

  const handleWarehouseChange = (id, value) => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, warehouse: value } : row
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

  const handleToggleView = () => {
    setViewOrderList((prevView) => !prevView);
    setSelectedOrders([]);
  };

  const handleDeleteSelectedOrders = () => {
    const updatedTableData = tableData.filter(
      (row) => !selectedOrders.includes(row.id)
    );
    setTableData(updatedTableData);
    setSelectedOrders([]);
  };

  const onOrderClick = (order) => {
    console.log('Order clicked:', order);
  };

  const orderList = [
    { idZamowienie: 1, IsOld: 'no', zIdKlient: 19 },
    { idZamowienie: 2, IsOld: 'no', zIdKlient: 23 },
    { idZamowienie: 3, IsOld: 'no', zIdKlient: 37 },
    { idZamowienie: 4, IsOld: 'no', zIdKlient: 51 },
  ];

  return (
    <div id='mainPage'>
      <NavBar />
      {viewOrderList ? (
        <>
          <h1 className='cardTitle'>Lista Zamówień</h1>
          <button className='toggleButton' onClick={handleToggleView}>
            Dodaj zamówienie
          </button>
          <div className='warehouseArea'>
            <table className='orderTable'>
              <thead>
                <tr>
                  <th>Wybór</th>
                  <th>ID</th>
                  <th>IsOld</th>
                  <th>ID Klienta</th>
                </tr>
              </thead>
              <tbody className='table'>
                {orderList.map((order) => (
                  <tr
                    id='orderList'
                    key={order.idZamowienie}
                    onClick={() => onOrderClick(order)}
                  >
                    <td>
                      <input
                        type='checkbox'
                        checked={selectedOrders.includes(order.idZamowienie)}
                        onChange={() => handleCheckboxChange(order.idZamowienie)}
                      />
                    </td>
                    <td>{order.idZamowienie}</td>
                    <td>{order.IsOld}</td>
                    <td>{order.zIdKlient}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='buttonContainer'>
            <button onClick={handleDeleteSelectedOrders}>Usuń zaznaczone</button>
            <button onClick={handleCancel}>Anuluj</button>
          </div>
        </>
      ) : (
        <>
          <h1 className='cardTitle'>Dodaj zamówienie</h1>
          <button className='toggleButton' onClick={handleToggleView}>
            Usuń zamówienie
          </button>
          <div className='warehouseArea'>
            <table className='orderTable'>
              <thead>
                <tr>
                  <th>Wybór</th>
                  <th>Produkty</th>
                  <th>ID produktu</th>
                  <th>LOT</th>
                  <th>Ilość palet</th>
                  <th>Magazyn</th>
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
                    <td>
                      <select
                        value={row.warehouse}
                        onChange={(e) =>
                          handleWarehouseChange(row.id, e.target.value)
                        }
                      >
                        <option value='Magazyn 1'>Magazyn 1</option>
                        <option value='Magazyn 2'>Magazyn 2</option>
                        <option value='Magazyn 3'>Magazyn 3</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='buttonContainer2'>
            <button onClick={handleAddOrder}>Dodaj</button>
            <button onClick={handleCancel}>Anuluj</button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderPage;