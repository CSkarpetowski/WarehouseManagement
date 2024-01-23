import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ViewOrderDetails.css";
import NavBar from "./NavBar";


const initialOrderList = [
  { idZamowienie: 1, IsOld: "not ready", zIdKlient: 19 },
  { idZamowienie: 2, IsOld: "not ready", zIdKlient: 23 },
  { idZamowienie: 3, IsOld: "not ready", zIdKlient: 37 },
  { idZamowienie: 4, IsOld: "not ready", zIdKlient: 51 },
];

const orderData = { //Symulator produktu
  1: [
    { LpZamowienie: 1, IDProd: "1", nazwa: "dwumasa", ilosc: "3", lot: "1245" },
    { LpZamowienie: 2, IDProd: "3", nazwa: "sprzęgło", ilosc: "2", lot: "5732" },
  ],
  2: [
    { LpZamowienie: 1, IDProd: "4", nazwa: "sprężyna", ilosc: "6", lot: "7532" },
    { LpZamowienie: 2, IDProd: "7", nazwa: "olej", ilosc: "2", lot: "3211" },
  ],
  3: [
    { LpZamowienie: 1, IDProd: "2", nazwa: "tłok", ilosc: "3", lot: "8561" },
    { LpZamowienie: 2, IDProd: "5", nazwa: "zaprawka", ilosc: "2", lot: "0477" },
  ],
  4: [
    { LpZamowienie: 1, IDProd: "9", nazwa: "tarcza hamulcowa", ilosc: "4", lot: "4502" },
  ],
};

const LeftPanel = ({ orderList, onOrderClick }) => {
  return (
    <div className="leftPanel">
      <h2>Lista zamówień</h2>

      <table className="orderTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>ID Klienta</th>
          </tr>
        </thead>
        <tbody className="table">
          {orderList.map((order) => (
            <tr
              id="orderList"
              key={order.idZamowienie}
              onClick={() => onOrderClick(order)}
            >
              <td>{order.idZamowienie}</td>
              <td>{order.IsOld}</td>
              <td>{order.zIdKlient}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const RightPanel = ({ selectedOrder }) => {
  return (
    <div className="rightPanel">
      <h2>Szczegóły zamówienia</h2>
      {selectedOrder && orderData[selectedOrder.idZamowienie] ? (
        <table className="orderTable">
          <thead>
            <tr>
              <th>LP</th>
              <th>ID produktu</th>
              <th className="productname">Produkt</th>
              <th>Ilość palet</th>
              <th>LOT</th>
            </tr>
          </thead>
          <tbody className="table">
            {orderData[selectedOrder.idZamowienie].map((order, index) => (
              <tr key={index}>
                <td>{order.LpZamowienie}</td>
                <td>{order.IDProd}</td>
                <td className="productname">{order.nazwa}</td>
                <td>{order.ilosc}</td>
                <td>{order.lot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Wybierz zamówienie z listy</p>
      )}
    </div>
  );
};

export default function ViewOrderDetails() {
  const [orderList] = useState(initialOrderList);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div id="ViewOrderDetails">
      <NavBar />
      <h1 className="cardTitle">Order Page</h1>
      <div className="option">
        <Link to="/orderpage" className="orderButton">
          Zarządzaj zamówieniami
        </Link>
      </div>
      <div className="warehouseArea">
        <div className="tablesContainer">
          <LeftPanel orderList={orderList} onOrderClick={handleOrderClick} />
          <RightPanel selectedOrder={selectedOrder} />
        </div>
      </div>
    </div>
  );
}