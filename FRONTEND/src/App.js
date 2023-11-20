import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import ConnectionTest from './components/ConnectionTest';
import AddProduct from './components/AddProduct';
import ProductPage from './components/ProductPage';
import WarehouseOne from './components/WarehouseOne';

function App() {
  function hasJWT() {
    let flag = false;
    // Sprawdź, czy użytkownik ma token JWT w localStorage
    localStorage.getItem("token") ? (flag = true) : (flag = false);
    return flag;
  }
  return (
    <div className='App'>
      {/* <Router>
        <Routes>
          <Route path='*' element={hasJWT() ? <MainPage /> : <LoginPage />} />
          <Route path='/AddProduct' element={hasJWT() ? <MainPage /> : <LoginPage />} />
        </Routes>
      </Router> */}
      {/* <ConnectionTest/> */}
     {/* <AddProduct/> */}
     {/* <ProductPage/> */}
     {/* <MainPage/> */}
     <WarehouseOne/>
    </div>
  );
}

export default App;