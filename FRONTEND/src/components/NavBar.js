import React, { useEffect, useState } from 'react'
import "./NavBar.css";
import {BiUserCircle} from "react-icons/bi";
import {BiBell} from "react-icons/bi";
import {AiOutlineIdcard} from 'react-icons/ai';
import {AiOutlineDashboard} from 'react-icons/ai';
import {LiaClipboardListSolid} from 'react-icons/lia';
import {GoPeople} from 'react-icons/go';
import {BsTruck} from 'react-icons/bs';
import { FaDatabase } from 'react-icons/fa';
import {FaSignOutAlt} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FiAlignLeft } from "react-icons/fi";
import LoginPage from './LoginPage';
import AddProduct from './AddProduct';
import OrderPage from './OrderPage';
import { MdAssignmentAdd } from "react-icons/md";
import WarehouseNote from './WarehouseNote'; //Import powiadomień
import {useGlobalState, setGlobalState} from './NoteAlert';
import * as signalR from '@microsoft/signalr';
export default function NavBar() {
  const [bellGreen,setBellGreen] = useState();
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7099/productChanged") // Replace with your SignalR endpoint
      .build();

    connection.start()
      .then(() => {
        console.log("SignalR Connected!");
      })
      .catch(err => console.error(err));

    connection.on("ProductChanged", () => {
      console.log("Sachnik Kurwa szef!");
      setBellGreen(true);
    });
  }, []);
  
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const isManager = localStorage.getItem("isManager");
  const [showNote, setShowNote] = useState(false);

  function SignOut() {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  }

  const NoteOff = () => {
    setBellGreen(false);
  }

  const toggleNote = () => {
    setShowNote(!showNote);
   
  };


  const navDashboard = () => {navigate("/MainPage")}
  const navAddProduct = () => {navigate("/AddProduct")}
  const navAddOrder = () => {navigate("/AddOrder")}
  const navWorkers = () => {navigate("/Workers")}
  const navDriver = () => {navigate("/Driver")}
  const navHistory = () => {navigate("/History")}
  return (
    <nav>
      <div style={{ textAlign: 'end', padding: '10px' }}>
        <FiAlignLeft
        className='noteBell'
          size={25}
          color={bellGreen ? "red" : "gold"}
          onClick={NoteOff}
    />
          <BiBell
          className='noteBell'
          size={25}
          color={ "gold"}
          onClick={toggleNote}
        />
        <WarehouseNote {...{ showNote, toggleNote }} />
      </div>
      <h2 id='barTitle'>Warehouse Management</h2>
      <div id='userDetail'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <BiUserCircle className='icon' size={25} color='#c87cfc' />
          <p style={{ color: isManager === 'true' ? 'gold' : 'white' }} id='userName'>{username}</p>
        </div>
      </div>
      <div id='appMenu'>
        <ul id='listMenu'>
        <li onClick={navDashboard} className='listItem'>
             <div>
            <AiOutlineDashboard size={20} color='#c87cfc'/>
            Dashboard
             </div>
            </li>
            <li className='listItem'>
            <div onClick={navDriver}>
            <BsTruck size={20} color="#c87cfc"/>
            <p>Order</p>
            </div>
          </li> 
            <li className='listItem'>
            <div onClick={navAddProduct}>
            <FaDatabase size={20} color="#c87cfc"/>
            <p>AddProduct</p>
            </div>
          </li>
          <li className='listItem'>
            <div onClick={navAddOrder}>
            <MdAssignmentAdd size={20}  color="#c87cfc" />
            <p>AddOrder</p>
            </div>
          </li>
           {/* <li className='listItem'>
            <div onClick={navOrders}>
              <LiaClipboardListSolid size={20} color="#c87cfc"/>
              <p></p> Orders
            </div>
            </li> */}

          <li className='listItem'>
            <div onClick={navWorkers}>
            <GoPeople size={20} color="#c87cfc"/>
            <p>Workers</p>
            </div>
            </li>
            <li className='listItem'>
            <div onClick={navHistory}>
            <GoPeople size={20} color="#c87cfc"/>
            <p>History</p>
            </div>
            </li>
        </ul>
        <button className='signOut' onClick={SignOut} >
          <FaSignOutAlt size={20} color="white" />
          SignOut
        </button>
      </div>
    </nav>
  );
}