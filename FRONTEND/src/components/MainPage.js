import React from 'react';
import './MainPage.css';
import NavBar from './NavBar';
import warehouseIcon from '../img/warehouse.png';
export default function MainPage() {
  return (
    <div id='mainPage'>
      <NavBar/>
    <h1  className='cardTitle'>Dashboard</h1>
    <div  className='warehouseArea'>
      <div onClick={()=>alert('Warehouse1')} id='warehouseOne'>
        <p className='warehouseTitle'>Magazyn 1</p>
        <img src={warehouseIcon} width={250} />
        <p>Contrary to popular belief, Lorem Ipsum is not simply random text.
           It has roots in a piece of classical Latin literature from 45 BC.</p>
      </div>
      <div onClick={()=>alert('Warehouse2')} id='warehouseTwo'>
        <p className='warehouseTitle'>Magazyn 2</p>
        <img src={warehouseIcon} width={250}/>
        <p>Contrary to popular belief, Lorem Ipsum is not simply random text.
           It has roots in a piece of classical Latin literature from 45 BC.</p>
      </div>
      <div onClick={()=>alert('Warehouse3')} id='warehouseThree'>
        <p className='warehouseTitle'>Magazyn 3</p>
        <img src={warehouseIcon} width={250}/>
        <p>Contrary to popular belief, Lorem Ipsum is not simply random text.
           It has roots in a piece of classical Latin literature from 45 BC.</p>
      </div>
    </div>
    </div>
  )
}

