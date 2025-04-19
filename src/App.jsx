import './App.css';
import React, {useState, useEffect, useRef} from 'react';



function App() {
let [homeScore, setScoreHome] = useState(0);
let [homeShots, setShotsHome] = useState(0);
let [homeChances, setChancesHome] = useState(0);
let [awayScore, setScoreAway] = useState(0);
let [awayShots, setShotsAway] = useState(0);
let [awayChances, setChancesAway] = useState(0);
let  [homeSavePct, setSvPctHome] = useState(0);
let [awaySavePct, setSvPctAway] = useState(0);
  function upBtn(type, team) {
    if (team == 'home') {
      if (type == 'goal') {
        setScoreHome(homeScore + 1);
        homeScore++;
      }
      setShotsHome(homeShots + 1);
      homeShots++;
    setSvPctAway(Math.round(((homeShots - homeScore)/homeShots) * 1000) / 1000);
  } else {
      if (type == 'goal') {
        setScoreAway(awayScore + 1);
        awayScore++;
      }
      setShotsAway(awayShots + 1);
      awayShots++;
      setSvPctHome(Math.round(((awayShots - awayScore)/awayShots) * 1000) / 1000);
  }
  }
  function downBtn(type, team) {
    if (team == 'home') {
      if(type == 'goal') {
        setScoreHome(homeScore - 1);
        homeScore--;
      }
    setShotsHome(homeShots - 1);
    homeShots--
    setSvPctAway(Math.round(((homeShots - homeScore)/homeShots) * 1000) / 1000);
  } else {
      if (type == 'goal') {
        setScoreAway(awayScore - 1);
        awayScore--
      }
      setShotsAway(awayShots - 1);
      awayShots--;
      setSvPctHome(Math.round(((awayShots - awayScore)/awayShots) * 1000) / 1000);
  }
  }
  function upChance(team) {
    if (team == 'home') {
      setChancesHome(homeChances + 1);
    } else {
      setChancesAway(awayChances + 1);
    }
  }
  function downChance(team) {
    if (team == 'home') {
      setChancesHome(homeChances - 1);
    } else {
      setChancesAway(awayChances - 1);
    }
  }

  let period = 1;
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

  function fullReset() {
    setTimeLeft(periodLength*60);
    setIsRunning(false);
    setSvPctAway(0);
    setSvPctHome(0);
    setShotsHome(0);
    setScoreHome(0);
    setShotsAway(0);
    setScoreAway(0);
    setChancesHome(0);
    setChancesAway(0);
  }

  if (homeShots == 0) {
    awaySavePct = 'N/A';
  }
  if (awayShots == 0) {
    homeSavePct = 'N/A';
  }
  return (
    <div className="App">
      <div className="scoreBtns">
        <button className="plusBtn" id="homeScorePlus" onClick={() => upBtn('goal', 'home')}>+</button>
        <button className="minusBtn" id="homeScoreMinus" onClick={() => downBtn('goal', 'home')}><p className='minus'>-</p></button>
        <button className="plusBtn" id="awayScorePlus" onClick={() => upBtn('goal', 'away')}>+</button>
        <button className="minusBtn" id="awayScoreMinus" onClick={() => downBtn('goal', 'away')}><p className='minus'>-</p></button>
        </div>
        <div className="scoreboard">
          <div className="home">
            <h1 className="teamName" id="home">HOME - {homeScore}</h1>
          </div>
          <div className="away">
            <h1 className="teamName" id="away">AWAY - {awayScore}</h1>
          </div>
        </div>
        <div className = "shot_count">
          <p className="shots" id="homeShots">{homeShots}</p>
          <p className="shots" id="sog">SOG</p>
          <p className="shots" id="awayShots">{awayShots}</p>
        </div>
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
      <div className="shotBtns">
        <button className="plusBtn" id="homeShotPlus" onClick={() => upBtn('shot', 'home')}>+</button>
        <button className="minusBtn" id="homeScoreMinus" onClick={() => downBtn('shot', 'home')}><p className='minus'>-</p></button>
        <button className="plusBtn" id="awayScorePlus" onClick={() => upBtn('shot', 'away')}>+</button>
        <button className="minusBtn" id="awayScoreMinus" onClick={() => downBtn('shot', 'away')}><p className='minus'>-</p></button>
        </div>
      <div className="savePct">
        <h1 className="savePctHeader">SAVE %:</h1>
        <h2 className="savePctHome">HOME: {homeSavePct}</h2>
        <h2 className="savePctAway">AWAY: {awaySavePct}</h2>
      </div>
      <div className='chances'>
      < h1 className="chancesHeader">CHANCES:</h1>
        <h2 className="chancesHome">HOME: {homeChances}</h2>
        <button className="plusBtn" id="homeChancePlus" onClick={() => upChance('home')}>+</button>
        <button className="minusBtn" id="homeChanceMinus" onClick={() => downChance('home')}><p className='minus'>-</p></button>
        <h2 className="chancesAway">AWAY: {awayChances}</h2>
        <button className="plusBtn" id="awayChancePlus" onClick={() => upChance('away')}>+</button>
        <button className="minusBtn" id="awayChanceMinus" onClick={() => downChance('away')}><p className='minus'>-</p></button>
      </div>
      <button className='resetGame' onClick={() => fullReset()}>RESET</button>
    </div>
  );
}

export default App;