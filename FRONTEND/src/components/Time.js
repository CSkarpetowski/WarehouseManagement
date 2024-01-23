import React, { useState, useEffect } from 'react';
import './Time.css';
//Zegar

export default function Time() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formattedDateTime = currentDateTime.toLocaleString();

  return (
        <div id='timeBox'>
                <p>{formattedDateTime}</p>
        </div>
  )
}
