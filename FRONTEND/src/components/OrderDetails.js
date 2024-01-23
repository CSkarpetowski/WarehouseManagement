import React, { useEffect, useState } from 'react';
import ReactToPrint from 'react-to-print';
import './OrderDetails.css';
import axios from 'axios';
import { useGlobalState} from './GlobalVariables';

class ComponentToPrint extends React.Component {
  render() {
    const { orderDetails, orderId, companyName } = this.props;

    return (
      <div>
        <h1 className='printOrder'>Company: {companyName}</h1>
        <h1 className='printOrder'>Order ID: {orderId}</h1>
        <table className="orderDetailsTable">
          <thead>
            <tr>
              <th>Name</th>
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
  const [language] = useGlobalState('language');
  
  const { orderId, handleClose, companyName } = props;
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
      axios.delete(`https://localhost:7099/api/zamowienie/delete/${orderId}`).then(() => 
      {
        alert('Order deleted')
        window.location.reload();
      });
    
    } catch (err) {
      console.log(err);
    }
  };

  const renderPolish = () => { //Render PL
    return (
      <div className="orderDetailsMain">
        <h1 className="orderWindowBar">
          <p onClick={handleClose} className="closeButton">
            X
          </p>
          ID Zamówienia : {orderId} | Firma: {companyName}
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
            Szczegóły zamówienia
          </p>
          <ComponentToPrint orderDetails={orderDetails} orderId={orderId} companyName={companyName} ref={componentRef} />
        </div>
        <ReactToPrint
          trigger={() => <button className="orderDetailsPrint">Drukuj Zamówienie</button>}
          content={() => componentRef.current}
        />
        <button className="orderDetailsDelete" onClick={deleteOrder}>
          Usuń Zamówienie
        </button>
      </div>
    );
  };

  const renderEnglish = () => { //Render EN
    return (
      <div className="orderDetailsMain">
        <h1 className="orderWindowBar">
          <p onClick={handleClose} className="closeButton">
            X
          </p>
          Order ID : {orderId} | Company: {companyName}
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
          <ComponentToPrint orderDetails={orderDetails} orderId={orderId} companyName={companyName} ref={componentRef} />
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
  };

  return ( // Sprawdzene czy PL czy EN
    <>
      {language === "PL" ? renderPolish() : renderEnglish()}
    </>
  );
}