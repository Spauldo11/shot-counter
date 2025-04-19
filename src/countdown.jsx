// partly not my code 
import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  let [play, setPlay] = useState(false);
  let [btnText, setBtnText] = useState('Play');
  let [periodText, setPeriod] = useState('1st');
  let period = 1;
  // Set period length to 20 minutes (1200 seconds) and overtime length to 5 minutes (3000 seconds)
  const periodLength = 0.1 * 60;
  const otLength = 5 * 60;

  let [timeLeft, setTimeLeft] = useState(periodLength);

  const Playpause = () => {
    setPlay(play = !play);
    if (!play) {
      setBtnText('Play');
    } else {
      setBtnText('Pause');
    }
    alert(play);
  }

  useEffect(() => {
    // If timeLeft is 0, change period and reset time
    if (timeLeft == 0) {
      Playpause();
      period = period + 1;
      if (period < 3) {
        setTimeLeft(periodLength);
      } else {
        setTimeLeft(otLength);
      }
      
      alert(period);
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
          break;
        case 5:
          setPeriod('S/O');
          break;
      }

    };

    // Set up the interval to decrement the timer every second
      const timer = setInterval(() => {
        if (play) {
        setTimeLeft(timeLeft - 1);
        }
      }, 1000);
   
    // Cleanup the interval when the component is unmounted or the timer ends
      return () => clearInterval(timer);
  }, [timeLeft]);

  // Convert timeLeft (in seconds) to minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <button className="playBtn" onClick={() => Playpause()}>{btnText}</button>
      <div className="time">
        <div className='timer'>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
        </div>
        <p className='period'>{periodText}</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
