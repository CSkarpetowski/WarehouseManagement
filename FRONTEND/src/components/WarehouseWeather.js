import React from 'react';
import './WarehouseWeather.css';
import ReactWeather, { useVisualCrossing } from 'react-open-weather';
import {useGlobalState} from './GlobalVariables';



const WarehouseWeather = ({ Wheater, ShowWeather }) => {

  const [language] = useGlobalState('language');
  const { data, isLoading, errorMessage } = useVisualCrossing({
    key: '24ACX68MVGMUUKAFVR5CUHNNQ', //Koordynaty 
    lat: '50.76844',
    lon: '17.84652',
    lang: 'pl', //język
    unit: 'metric', // Wybór jednostki
  });

const renderPolish = () => { //Render PL
  return (
    <div className="warehouse-weather-container">
      {Wheater && (
        <div className="warehouse-weather-list">
          <div className='noteHeader'>
            <h2 className='title'>Pogoda</h2>
          </div>
          <ReactWeather
      isLoading={isLoading}
      errorMessage={errorMessage}
      data={data}
      lang="en"
      locationLabel="Dobrzeń Wielki"
      unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
      showForecast
    />
        </div>
      )}
    </div>
  );}
  const renderEnglish = () => { //Render EN
    return (
      <div className="warehouse-weather-container">
        {Wheater && (
          <div className="warehouse-weather-list">
            <div className='noteHeader'>
              <h2 className='title'>Weather</h2>
            </div>
            <ReactWeather
        isLoading={isLoading}
        errorMessage={errorMessage}
        data={data}
        lang="en"
        locationLabel="Dobrzeń Wielki"
        unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
        showForecast
      />
          </div>
        )}
      </div>
    );}
    return ( // Sprawdzenie czy wybrany jest PL czy EN
      <>
      {language == "PL" ? renderPolish() : renderEnglish()}
    
      </>
    );
};

export default WarehouseWeather;
