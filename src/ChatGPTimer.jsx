// mostly not my code
import React, { useState, useEffect, useRef } from 'react';
let period = 1;

function Timer() {
  let periodLength = 20;
  const [timeLeft, setTimeLeft] = useState(periodLength * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [periodText, setPeriod] = useState('1st');
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 0) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsRunning(false);
            period = period + 0.5; // function was running twice so I had to improvise
            switch (period) {
              case 1:
                setPeriod('1st');
                break;
              case 2:
                setPeriod('2nd');
                break;
              case 3:
                setPeriod('3rd');
                break;
              case 4:
                setPeriod('OT');
                periodLength = 5;
                break;
              case 5:
                setPeriod('S/O');
                periodLength = null;
                break;
            }
            setTimeLeft(periodLength * 60);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
  }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  };

  const formatTime = (totalSeconds) => {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };
  return (
    <div className='fullTimer'>
      <button className="playBtn" onClick={toggleTimer}>
        <p className='btnText'>{isRunning ? 'Pause' : 'Play'}</p>
      </button>
      <div className='time'>
        <div className='timer'>
      <h1 className='timeTxt'>{formatTime(timeLeft)}</h1>
      </div>
      <h2 className='period'>{periodText}</h2>
      </div>
    </div>
  );
}
export default Timer;