import React, { useEffect, useState } from 'react';
import ReactToPrint from 'react-to-print';
import './OrderDetails.css';
import axios from 'axios';

class ComponentToPrint extends React.Component {
  render() {
    const { orderDetails, orderId } = this.props;

    return (
      <div>
        <h1 className='printClient'>Client ID : {orderId}</h1>
        <table className="orderDetailsTable">
          <thead>
            <tr>
              <th>Nazwa</th>
              <th>Quantity</th>
              <th>LOT</th>
              <th>WarehouseID</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.length > 0 &&
              orderDetails.map((det) => (
                <tr key={det.lpZamowienie}>
                  <td>{det.produkty.nazwa}</td>
                  <td>{det.ilosc}</td>
                  <td>{det.lot}</td>
                  <td>{det.produkty.pIdMagazyn}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default function OrderDetails(props) {
  const { orderId, handleClose } = props;
  const [orderDetails, setOrderDetails] = useState([]);
  const componentRef = React.createRef();

  useEffect(() => {
    try {
      axios.get(`https://localhost:7099/api/zamowienie/details/${orderId}`).then((response) => {
        const orderDataArray = [response.data];
        setOrderDetails(orderDataArray[0]);
      });
    } catch (err) {
      console.log(err);
    }
  }, [orderId]);

  const deleteOrder = () => {
    try {
      axios.delete(`https://localhost:7099/api/zamowienie/delete/${orderId}`).then(() => alert('Zamówienie usunięto'));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="orderDetailsMain">
      <h1 className="orderWindowBar">
        <p onClick={handleClose} className="closeButton">
          X
        </p>
        Client ID : {orderId}
      </h1>
      <div className="orderDetailsTableArea">
        <p
          style={{
            color: 'white',
            fontSize: '30px',
            textAlign: 'center',
            fontFamily: 'Roboto, Helvetica, sans-serif',
            margin: '0',
          }}
        >
          Order details
        </p>
        <ComponentToPrint orderDetails={orderDetails} orderId={orderId} ref={componentRef} />
      </div>
      <ReactToPrint
        trigger={() => <button className="orderDetailsPrint">Print Order</button>}
        content={() => componentRef.current}
      />
      <button className="orderDetailsDelete" onClick={deleteOrder}>
        Delete Order
      </button>
    </div>
  );
}