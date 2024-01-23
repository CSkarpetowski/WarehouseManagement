import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import PageLoader from './components/PageLoader';
import OrderPage from './components/OrderPage';
import AddProduct from './components/AddProduct';
import WarehouseOne from './components/WarehouseOne';
import WarehouseTwo from './components/WarehouseTwo';
import WarehouseThree from './components/WarehouseThree';
import Order from './components/Order';
import OrderHistory from './components/OrderHistory';
import WorkersPage from './components/WorkersPage';



function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Symulacja operacji asynchronicznej (np. ładowanie danych)
    const fetchData = async () => {
      // Tutaj umieść kod do pobrania danych lub innych operacji
      // Symulacja czasu ładowania - użyj setTimeout
      setTimeout(() => {
        setIsLoading(false);
      }, 800); // Symulowany czas ładowania: 2 sekundy
    };

    // Wywołaj funkcję pobierającą dane
    fetchData();
  }, []); // Pusta zależność oznacza, że useEffect zostanie uruchomiony tylko raz po zamontowaniu komponentu

    
  function hasJWT() {
    let flag = false;
    // Sprawdź, czy użytkownik ma token JWT w localStorage
    localStorage.getItem("token") ? (flag = true) : (flag = false);
    return flag;
  }

 

  return (
    <div className='App'>
       {isLoading ? ( // Wyświetl loader, jeśli isLoading jest true
        <PageLoader />
      ) : (
        <Router>
        <Routes>
          <Route path='*' element={hasJWT() ? <MainPage /> : <LoginPage />} />
          <Route path='/Dashboard' element={hasJWT() ? <MainPage /> : <LoginPage />} />
          <Route path='/AddProduct' element={hasJWT() ? <AddProduct/> : <LoginPage />} />
          <Route path='/AddOrder' element={hasJWT() ? <OrderPage/> : <LoginPage />} />
          <Route path='/WarehouseOne' element={hasJWT() ? <WarehouseOne/> : <LoginPage />} />
          <Route path='/WarehouseTwo' element={hasJWT() ? <WarehouseTwo/> : <LoginPage />} />
          <Route path='/WarehouseThree' element={hasJWT() ? <WarehouseThree/> : <LoginPage />} />
          <Route path='/Driver' element={hasJWT() ? <Order/> : <LoginPage />} />
          <Route path='/Workers' element={hasJWT() ? <WorkersPage/> : <LoginPage />} />
          <Route path='/History' element={hasJWT() ? <OrderHistory/> : <LoginPage />} />
        </Routes>
      </Router>
      )} 
    </div>
  );
}

export default App;