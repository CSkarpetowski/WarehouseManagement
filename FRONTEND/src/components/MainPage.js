import React,  { useEffect, useState } from 'react';
import './MainPage.css';
import NavBar from './NavBar';
import axios from 'axios';
import warehouseIcon from '../img/warehouse.png';
import { useNavigate } from 'react-router-dom';
export default function MainPage() {
  var stan1;
  var stan2;
  var stan3;
  const [stanone, setstanone] = useState({ ilosc: 0, pojemnosc: 0 });
  const [stantwo, setstantwo] = useState({ ilosc: 0, pojemnosc: 0 });
  const [stanthree, setstanthree] = useState({ ilosc: 0, pojemnosc: 0 });
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
        console.log(stanone);
    
        function Progres({ stan }) {
          if (stan.ilosc / stan.pojemnosc >= 0.9) {
            return <progress className="red" value={stan.ilosc} max={stan.pojemnosc}></progress>;
          } else if (stan.ilosc / stan.pojemnosc >= 0.75) {
            return <progress className="orange" value={stan.ilosc} max={stan.pojemnosc}></progress>;
          } else {
            return <progress className="green" value={stan.ilosc} max={stan.pojemnosc}></progress>;
          }
        }

    

  const navigate = useNavigate();
  return (
    <div id='mainPage'>
      <NavBar/>
    <h1  className='cardTitle'>Dashboard</h1>
    <div  className='warehouseAreaMain'>
      <div onClick={()=>navigate("/WarehouseOne")} id='warehouseOne'>
        <p className='warehouseTitle'>Magazyn 1</p>
        <img src={warehouseIcon} style={{width:'15vw'}} />
        <Progres stan={stanone} />
        <p>{stanone.ilosc}/{stanone.pojemnosc}</p>

          
      </div>
      <div onClick={()=>navigate("/WarehouseTwo")} id='warehouseTwo'>
        <p className='warehouseTitle'>Magazyn 2</p>
        <img src={warehouseIcon} style={{width:'15vw'}} />
        <Progres stan={stantwo} />
        <p>{stantwo.ilosc}/{stantwo.pojemnosc}</p>
          
      </div>
      <div onClick={()=>navigate("/WarehouseThree")} id='warehouseThree'>
        <p className='warehouseTitle'>Magazyn 3</p>
        <img src={warehouseIcon} style={{width:'15vw'}} />
        <Progres stan={stanthree} />
        <p>{stanthree.ilosc}/{stanthree.pojemnosc}</p>
          
      </div>
    </div>
    </div>
  )
}

