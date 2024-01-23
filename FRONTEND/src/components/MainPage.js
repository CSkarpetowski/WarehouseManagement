import React,  { useEffect, useState } from 'react';
import './MainPage.css';
import NavBar from './NavBar';
import axios from 'axios';
import warehouseIcon from '../img/warehouse.png';
import Clock from 'react-live-clock';
import { useNavigate } from 'react-router-dom';
import {useGlobalState} from './GlobalVariables';
import checkjwt from './CheckJwt';

export default function MainPage() {
  var stan1;
  var stan2;
  var stan3;
  const [stanone, setstanone] = useState({ ilosc: 0, pojemnosc: 0 });
  const [stantwo, setstantwo] = useState({ ilosc: 0, pojemnosc: 0 });
  const [stanthree, setstanthree] = useState({ ilosc: 0, pojemnosc: 0 });
  const [language] = useGlobalState('language');
  
 
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response1 = await axios.get('https://localhost:7099/api/produkt/magStan/1');
          stan1=response1.data;
          
  
          const response2 = await axios.get('https://localhost:7099/api/produkt/magStan/2');
          stan2=response2.data;
          
  
          const response3 = await axios.get('https://localhost:7099/api/produkt/magStan/3');
          stan3=response3.data;

          setstanone(stan1);
          setstantwo(stan2);
          setstanthree(stan3);

          
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, []);
        
    
        function Progres({ stan }) {
          if (stan.ilosc / stan.pojemnosc >= 0.9) {
            return <progress className="red"  value={stan.ilosc} max={stan.pojemnosc}>HI!</progress>;
          } else if (stan.ilosc / stan.pojemnosc >= 0.75) {
            return <progress className="orange"  value={stan.ilosc} max={stan.pojemnosc}></progress>;
          } else {
            return <progress className="green" value={stan.ilosc} max={stan.pojemnosc}></progress>;
          }
        }

    
  function navigateTo(warehouse){
    checkjwt();
    navigate(warehouse);
  }
  const navigate = useNavigate();
  const renderPolish = () => {
    return (
      <div id='mainPage'>
        <NavBar/>
        <div className='clockBox'>
        <Clock
            format={'HH:mm:ss  DD.MM.YYYY'}
            ticking={true}
            style={{color:'white', fontSize:'20px'}}
            />
        </div>
      <h1  className='cardTitle'>Strona Główna</h1>
      <div  className='warehouseAreaMain'>
        <div onClick={()=>navigateTo("/WarehouseOne")} id='warehouseOne' style={{paddingBottom:'3%'}}>
          <p className='warehouseTitle'>Magazyn 1</p>
          <img src={warehouseIcon} style={{width:'15vw'}} />
          <p style={{textAlign:'center'}}>{stanone.ilosc}/{stanone.pojemnosc}</p>
          <Progres stan={stanone} />
            
        </div>
        <div onClick={()=>navigateTo("/WarehouseTwo")} id='warehouseTwo' style={{paddingBottom:'3%'}}>
          <p className='warehouseTitle'>Magazyn 2</p>
          <img src={warehouseIcon} style={{width:'15vw'}} />
          <p style={{textAlign:'center'}}>{stantwo.ilosc}/{stantwo.pojemnosc}</p>
          <Progres stan={stantwo} />
            
        </div>
        <div onClick={()=>navigateTo("/WarehouseThree")} id='warehouseThree' style={{paddingBottom:'3%'}}>
          <p className='warehouseTitle'>Magazyn 3</p>
          <img src={warehouseIcon} style={{width:'15vw'}} />
          <p style={{textAlign:'center'}}>{stanthree.ilosc}/{stanthree.pojemnosc}</p>
          <Progres stan={stanthree} />
          
        </div>
      </div>
      </div>
    )
  }
  const renderEnglish = () => {
    return (
      <div id='mainPage'>
        <NavBar/>
        <div className='clockBox'>
        <Clock
            format={'HH:mm:ss  DD.MM.YYYY'}
            ticking={true}
            style={{color:'white', fontSize:'20px'}}
            />
        </div>
      <h1  className='cardTitle'>Dashboard</h1>
      <div  className='warehouseAreaMain'>
        <div onClick={()=>navigateTo("/WarehouseOne")} id='warehouseOne' style={{paddingBottom:'3%'}}>
          <p className='warehouseTitle'>Warehouse 1</p>
          <img src={warehouseIcon} style={{width:'15vw'}} />
          <p style={{textAlign:'center'}}>{stanone.ilosc}/{stanone.pojemnosc}</p>
          <Progres stan={stanone} />
            
        </div>
        <div onClick={()=>navigateTo("/WarehouseTwo")} id='warehouseTwo' style={{paddingBottom:'3%'}}>
          <p className='warehouseTitle'>Warehouse 2</p>
          <img src={warehouseIcon} style={{width:'15vw'}} />
          <p style={{textAlign:'center'}}>{stantwo.ilosc}/{stantwo.pojemnosc}</p>
          <Progres stan={stantwo} />
            
        </div>
        <div onClick={()=>navigateTo("/WarehouseThree")} id='warehouseThree' style={{paddingBottom:'3%'}}>
          <p className='warehouseTitle'>Warehouse 3</p>
          <img src={warehouseIcon} style={{width:'15vw'}} />
          <p style={{textAlign:'center'}}>{stanthree.ilosc}/{stanthree.pojemnosc}</p>
          <Progres stan={stanthree} />
          
        </div>
      </div>
      </div>
    )
  }
  
  

  return (
    <>
    {language == "PL" ? renderPolish() : renderEnglish()}

    </>
  );}













