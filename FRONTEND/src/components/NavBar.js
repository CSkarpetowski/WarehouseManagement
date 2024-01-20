import React, { useEffect, useState } from 'react'
import "./NavBar.css";
import WarehouseWeather from './WarehouseWeather';
import {jwtDecode} from "jwt-decode";
import {BiUserCircle} from "react-icons/bi";
import {BiBell} from "react-icons/bi";
import {AiOutlineIdcard} from 'react-icons/ai';
import {AiOutlineDashboard} from 'react-icons/ai';
import {LiaClipboardListSolid} from 'react-icons/lia';
import langPL from '../img/langPL.png';
import langEN from '../img/langEN.png';
import {GoPeople} from 'react-icons/go';
import {BsTruck} from 'react-icons/bs';
import { FaDatabase } from 'react-icons/fa';
import {FaSignOutAlt} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FiAlignLeft } from "react-icons/fi";
import { PiCloudSunBold } from "react-icons/pi";
import LoginPage from './LoginPage';
import AddProduct from './AddProduct';
import OrderPage from './OrderPage';
import { MdAssignmentAdd } from "react-icons/md";
import WarehouseNote from './WarehouseNote'; //Import powiadomień
import {useGlobalState, setGlobalState} from './GlobalVariables';
import * as signalR from '@microsoft/signalr';
import { LiaHistorySolid } from "react-icons/lia";
import checkjwt from './CheckJwt';

export default function NavBar() {
  const [bellGreen,setBellGreen] = useState();
  const [language,setLanguage] = useGlobalState('language');
  console.log(language);


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
  const [Weather, setWeather] = useState(false);

  

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
  const toggleWeather = () => {
    setWeather(!Weather);
   
  };


  const navDashboard = () => {checkjwt(); navigate("/MainPage")}
  const navAddProduct = () => {checkjwt(); navigate("/AddProduct")}
  const navAddOrder = () => {checkjwt(); navigate("/AddOrder")}
  const navWorkers = () => {checkjwt(); navigate("/Workers")}
  const navDriver = () => {checkjwt(); navigate("/Driver")}
  const navHistory = () => {checkjwt(); navigate("/History")}

  const renderPolish = () => {
  return (
    <nav>
      <div>

      <img alt="Polish"
        style={{margin:'5px',borderBottom: language==='PL' ? '2px solid green' : 'none'}}
        onClick={()=>{setLanguage('PL')}}
        width={25} src={langPL}/>

      <img alt="English"
       style={{margin:'5px',borderBottom: language==='EN' ? '2px solid green' : 'none'}}
       onClick={()=>{setLanguage('EN')}}
       width={25} src={langEN}/>

      </div>

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
        <PiCloudSunBold 
        className='noteBell'
        size={25}
        color={ "gold"}
        onClick={toggleWeather}
        />
        {Weather && <WarehouseWeather Wheater={Weather} />}
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
            Główna
            
             </div>
            </li>
            <li className='listItem'>
            <div onClick={navDriver}>
            <BsTruck size={20} color="#c87cfc"/>
            <p>Zamówienia</p>
            </div>
          </li> 
            <li className='listItem'>
            <div onClick={navAddProduct}>
            <FaDatabase size={20} color="#c87cfc"/>
            <p>Dodaj Produkt</p>
            </div>
          </li>
          <li className='listItem'>
            <div onClick={navAddOrder}>
            <MdAssignmentAdd size={20}  color="#c87cfc" />
            <p>Dodaj Zam.</p>
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
            <p>Pracownicy</p>
            </div>
            </li>
            <li className='listItem'>
            <div onClick={navHistory}>
            <LiaHistorySolid size={20} color="#c87cfc" />
            <p>Historia</p>
            </div>
            </li>
        </ul>
        <button className='signOut' onClick={SignOut} >
          <FaSignOutAlt size={20} color="white" />
          Wyloguj się
        </button>
        
      </div>
    </nav>
  );}
  const renderEnglish = () => {
    return (
      <nav>
        <div>
  
        <img alt="Polish"
          style={{margin:'5px',borderBottom: language==='PL' ? '2px solid green' : 'none'}}
          onClick={()=>{setLanguage('PL')}}
          width={25} src={langPL}/>
  
        <img alt="English"
         style={{margin:'5px',borderBottom: language==='EN' ? '2px solid green' : 'none'}}
         onClick={()=>{setLanguage('EN')}}
         width={25} src={langEN}/>
  
        </div>
  
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
          <PiCloudSunBold 
          className='noteBell'
          size={25}
          color={ "gold"}
          onClick={toggleWeather}
          />
          {Weather && <WarehouseWeather Wheater={Weather} />}
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
              <LiaHistorySolid size={20} color="#c87cfc" />
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
    );}
    return (
      <>
      {language == "PL" ? renderPolish() : renderEnglish()}
    
      </>
    );

}