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

export default function NavBar() {
  //const navigate = useNavigate();
  const username = localStorage.getItem("username");
  function SignOut()
  {
    localStorage.removeItem("token");
   // navigate("/");
    window.location.reload();
  }
  return (
    <nav>

      <h2 id='barTitle'>Warehouse Management</h2>
      <div id='userDetail'>

        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}> 
          <BiUserCircle className='icon' size={25} color='#c87cfc'/>
          <p id='userName'>Stefan</p>
        </div>
        {/* <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <AiOutlineIdcard className='icon' size={25} color='#c87cfc'/>
        <p id='userCode'>#47238</p>
        </div> */}
      
      </div>
      <div id='appMenu'>
        <ul id='listMenu'>

          <li className='listItem'>
             <div>
            <AiOutlineDashboard size={20} color='#c87cfc'/>
            Dashboard
             </div>
            </li>
            <li className='listItem'>
            <div>
            <FaDatabase size={20} color="#c87cfc"/>
            <p>AddProduct</p>
            </div>
          </li>
          <li className='listItem'>
            <div>
              <LiaClipboardListSolid size={20} color="#c87cfc"/>
              <p></p> Orders
            </div>
            </li>

          <li className='listItem'>
            <div>
            <GoPeople size={20} color="#c87cfc"/>
            <p>Workers</p>
            </div>
            </li>

          <li className='listItem'>
            <div>
            <BsTruck size={20} color="#c87cfc"/>
            <p>Clients</p>
            </div>
          </li>
          <li className='listItem'>
          <div > 
            <FaSignOutAlt size={20} color="#c87cfc" />
            <p id='signOut' >SignOut</p>
          </div>
          </li>
        </ul>

      </div>
    </nav>
  )
}
