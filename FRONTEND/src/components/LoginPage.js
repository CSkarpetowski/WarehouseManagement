import React from 'react';
import './LoginPage.css';
import { useState } from 'react';
import {PiIdentificationCardFill} from 'react-icons/pi';
import {RiLockPasswordFill} from 'react-icons/ri';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [setError] = useState('');
  const navigate = useNavigate();

  const isManager = async (username) => {
    try {
      const response = await axios.get(`https://localhost:7099/idfromlogin/ismanager/${username}`);
      // Sprawdź odpowiedź serwera - jeśli zawiera odpowiednią informację, zwróć true, w przeciwnym razie false
      localStorage.setItem("isManager",response.data);
    } catch (err) {
      setError("Error");
    }
  };

  const handleSubmit = async () => {
      try {
          const response = await axios.post('https://localhost:7099/api/auth/login', {
              username,
              password,
          });
          const token = response.data.token;
          localStorage.setItem("token", token);
          localStorage.setItem("username", username);
          isManager(username);
          
          navigate('/');
          window.location.reload();
      } catch (err) {
          setError('Nie można zalogować!');
      }
  };


  return (
    <div id='mainLogin'>
      <div id='loginNav'>
      <h1 style={{color:'white', margin:'0', textAlign:'center'}}>Warehouse Management</h1>
      </div>
            <div id='loginArea'>
                <div id='loginBlock'>
                    <h1>Zaloguj</h1>
                    <div id='inputBlock'>
                    <i id='iD'><PiIdentificationCardFill size={25} color='#4b6cb7'/></i>
                    <input
                      type='text'
                      placeholder='ID'
                      name='usernameInput'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                     <br/>
                     <i id='pass'><RiLockPasswordFill size={25} color='#4b6cb7'/></i>
                     <input
                        type='password'
                        placeholder='PASSWORD'
                        name='passwordInput'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                     <br/>
                     <button onClick={handleSubmit}>LOGIN</button>
                    </div>
                    <br/>
                    <div style={{display:'none'}} id='registerError'>
                      <h4 style={{color:'red', margin:'0'}}>Nie można zalogować !</h4>
                    </div>
                </div>
            </div>
      </div>
  )
}