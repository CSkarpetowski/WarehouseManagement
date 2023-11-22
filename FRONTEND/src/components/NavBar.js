import React from 'react'
import "./NavBar.css";
import {BiUserCircle} from "react-icons/bi";
import {AiOutlineIdcard} from 'react-icons/ai';
import {AiOutlineDashboard} from 'react-icons/ai';
import {LiaClipboardListSolid} from 'react-icons/lia';
import {GoPeople} from 'react-icons/go';
import {BsTruck} from 'react-icons/bs';
import { FaDatabase } from 'react-icons/fa';
import {FaSignOutAlt} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import { MdAssignmentAdd } from "react-icons/md";

export default function NavBar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  function SignOut()
  {
    localStorage.removeItem("token");
   navigate("/");
    window.location.reload();
  }
  const navDashboard = () => {navigate("/MainPage")}
  const navAddProduct = () => {navigate("/AddProduct")}
  const navAddOrder = () => {navigate("/AddOrder")}
  const navWorkers = () => {navigate("/Workers")}
  const navDriver = () => {navigate("/Driver")}
  return (
    <nav>

      <h2 id='barTitle'>Warehouse Management</h2>
      <div id='userDetail'>

        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}> 
          <BiUserCircle className='icon' size={25} color='#c87cfc'/>
          <p id='userName'>{username}</p>
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
            <div onClick={navDriver}>
            <BsTruck size={20} color="#c87cfc"/>
            <p>Driver</p>
            </div>
          </li> 
          <li className='listItem'>
          <div className='signOut' onClick={SignOut}> 
            <FaSignOutAlt size={20} color="#c87cfc" />
            <p id='signOut' >SignOut</p>
          </div>
          </li>
        </ul>

      </div>
    </nav>
  )
}
