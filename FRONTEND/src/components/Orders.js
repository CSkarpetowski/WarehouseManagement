import React from 'react'
import './Orders.css';
export default function Orders() {

    const orderData = [
        { lp: 1, lot: '1234', firma: 'ABC Transport', kierowca: 'Jan Kowalski' },
        { lp: 2, lot: '5678', firma: 'XYZ Logistics', kierowca: 'Anna Nowak' },
        { lp: 3, lot: '9876', firma: 'TransportXpress', kierowca: 'Marek Nowicki' },
      ];

  return (
    <>
    <h1 className='cardTitle'>Orders</h1>
    <div id='orderCard'>
    <table className='orderTable'>
        <thead>
          <tr>
            <th>LP</th>
            <th>LOT</th>
            <th>Firma</th>
            <th>Kierowca</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((order, index) => (
            <tr key={index}>
              <td>{order.lp}</td>
              <td>{order.lot}</td>
              <td>{order.firma}</td>
              <td>{order.kierowca}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  )
}
