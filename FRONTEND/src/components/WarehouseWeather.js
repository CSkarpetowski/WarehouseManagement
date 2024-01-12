import React, { useState, useEffect } from 'react';
import './WarehouseWeather.css';
import ReactWeather, { useVisualCrossing } from 'react-open-weather';
import {useGlobalState, setGlobalState} from './GlobalVariables';



const WarehouseWeather = ({ Wheater, ShowWeather }) => {

  const [language,setLanguage] = useGlobalState('language');
  console.log(language);
  const { data, isLoading, errorMessage } = useVisualCrossing({
    key: '24ACX68MVGMUUKAFVR5CUHNNQ',
    lat: '50.76844',
    lon: '17.84652',
    lang: 'pl',
    unit: 'metric', // values are (metric,us,uk)
  });

const renderPolish = () => {
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
  const renderEnglish = () => {
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
    return (
      <>
      {language == "PL" ? renderPolish() : renderEnglish()}
    
      </>
    );
};

export default WarehouseWeather;
