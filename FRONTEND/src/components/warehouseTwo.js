import React, { useState } from 'react';
import NavBar from './NavBar';
import './warehouseTwo.css';

const WarehouseTwo = () => {
  const initialOrderList = [
    { idZamowienie: 5, IsOld: 'yes', zIdKlient: 54 },
    { idZamowienie: 6, IsOld: 'no', zIdKlient: 87 },
    { idZamowienie: 7, IsOld: 'no', zIdKlient: 86 },
    { idZamowienie: 8, IsOld: 'yes', zIdKlient: 99 },
  ];

  const [orderList, setOrderList] = useState(initialOrderList);
  const [selectedOrders, setSelectedOrders] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedOrders((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const onOrderClick = (order) => {
    console.log('Order clicked:', order);
  };

  const handleDeleteSelectedOrders = () => {
    setOrderList((prevOrderList) =>
      prevOrderList.filter(
        (order) => !selectedOrders.includes(order.idZamowienie)
      )
    );
    setSelectedOrders([]);
  };

  const handleCancel = () => {
    setSelectedOrders([]);
  };

  return (
    <div id='mainPage'>
      <NavBar />
      <h1 className='cardTitle'>Magazyn 2 - Zamówienia</h1>
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
        <div className='buttonContainer'>
          <button onClick={handleDeleteSelectedOrders}>Usuń</button>
          <button onClick={handleCancel}>Anuluj</button>
        </div>
      </div>
    </div>
  );
};

export default WarehouseTwo;