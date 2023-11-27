import React from 'react';
import './MainPage.css';
import NavBar from './NavBar';
import warehouseIcon from '../img/warehouse.png';
import { useNavigate } from 'react-router-dom';
export default function MainPage() {
  const navigate = useNavigate();
  return (
    <div id='mainPage'>
      <NavBar/>
    <h1  className='cardTitle'>Dashboard</h1>
    <div  className='warehouseAreaMain'>
      <div onClick={()=>navigate("/WarehouseOne")} id='warehouseOne'>
        <p className='warehouseTitle'>Magazyn 1</p>
        <img src={warehouseIcon} style={{width:'15vw'}} />
          <progress value={80} max={100}></progress>
      </div>
      <div onClick={()=>navigate("/WarehouseTwo")} id='warehouseTwo'>
        <p className='warehouseTitle'>Magazyn 2</p>
        <img src={warehouseIcon} style={{width:'15vw'}} />
          <progress value={40} max={100}></progress>
      </div>
      <div onClick={()=>navigate("/WarehouseThree")} id='warehouseThree'>
        <p className='warehouseTitle'>Magazyn 3</p>
        <img src={warehouseIcon} style={{width:'15vw'}} />
          <progress value={20} max={100}></progress>
      </div>
    </div>
    </div>
  )
}

