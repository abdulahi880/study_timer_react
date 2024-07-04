import React, { useRef, useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import ModalSettings from "./Components/ModalSettings";
import Navigation from "./Components/Navigation";
import Timer from "./Components/Timer";
import Settings from "./Components/Settings";
import './App.css';
import './index.css';
import bellSound from './Components/bell.mp3';

function App() {
  const [POMODORO, SHORTBREAK, LONGBREAK] = [25, 5, 10];
  const cycleRef = useRef([0, 1, 0, 1, 0, 1, 0, 2]);
  const [cycleIndex, setCycleIndex] = useState(0);
  const [openSetting, setOpenSetting] = useState(false);
  const [ticking, setTicking] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [sessionsDone, setSessionsDone] = useState(0);
  const [pomodoro, setPomodoro] = useState(POMODORO);
  const [shortBreak, setShortBreak] = useState(SHORTBREAK);
  const [longBreak, setLongBreak] = useState(LONGBREAK);
  const [seconds, setSeconds] = useState(0);
  const [stage, setStage] = useState(0);
  const [consumedSecond, setConsumedSecond] = useState(0);
  const audio = new Audio(bellSound);
  
  const pomodoroRef = useRef();
  const shortBreakRef = useRef();
  const longBreakRef = useRef();

  const playSound = () => {
    audio.currentTime = 0;
    audio.play();
  };
  
  const updateTimeDefaultValue = () => {
    setPomodoro(Number(pomodoroRef.current.value));
    setShortBreak(Number(shortBreakRef.current.value));
    setLongBreak(Number(longBreakRef.current.value));
  };

  const getTickingTime = useCallback(() => {
    const timeStage = {
      0: pomodoro,
      1: shortBreak,
      2: longBreak,
    };
    return timeStage[stage];
  }, [pomodoro, shortBreak, longBreak, stage]);
  
  const updateMinute = () => {
    const updateStage = {
      0: setPomodoro,
      1: setShortBreak,
      2: setLongBreak,
    };
    return updateStage[stage];
  };

  const switchStage = (index) => {
    const isYes = consumedSecond && stage !== index ? window.confirm("Are you sure you want to switch?") : false;
    if (isYes) {
      reset();
      setStage(index);
    } else if (!consumedSecond) {
      setStage(index);
      setIsTimeUp(false);
    }
  };

  const reset = () => {
    setConsumedSecond(0);
    setTicking(false);
    setPomodoro(POMODORO);
    setShortBreak(SHORTBREAK);
    setLongBreak(LONGBREAK);
    setSeconds(0);
  };

  const timeUp = () => {
    reset();
    setIsTimeUp(true);
  };

  const clockTicking = () => {
    const minutes = getTickingTime();
    const setMinutes = updateMinute();
    if (minutes === 0 && seconds === 0) {
      timeUp();
      const nextIndex = (cycleIndex + 1) % cycleRef.current.length;
      setCycleIndex(nextIndex);
      switchStage(cycleRef.current[nextIndex]);
      if (stage === 0) {
        setSessionsDone((prevSessionsDone) => prevSessionsDone + 1);
      }  
      playSound();
    } else if (seconds === 0) {
      setMinutes((minute) => minute - 1);
      setSeconds(59);
    } else {
      setSeconds((second) => second - 1);
    }
  };

  const startTimer = () => {
    setIsTimeUp(false);
    setTicking((ticking) => !ticking);
  };

  const updateFavicon = (stage) => {
    const faviconUrl = `${stage}.png`;
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'icon';
    link.href = faviconUrl;
    document.head.appendChild(link);
  };

  useEffect(() => {
    updateFavicon(stage);
  }, [stage]);

  useEffect(() => {
    document.body.style.backgroundColor = stage === 1 ? "#B2DFDB" : stage === 2 ? '#BBDEFB' : '#E1BEE7';
  }, [stage]);

  useEffect(() => {
    window.onbeforeunload = () => {
      return consumedSecond ? "Show warning" : null;
    };

    const timer = setInterval(() => {
      if (ticking) {
        setConsumedSecond((value) => value + 1);
        clockTicking();
      }
    }, 1000);
    if (isTimeUp) {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [clockTicking, consumedSecond, isTimeUp, ticking]);

  useEffect(() => {
    const STATE_FLOW = ['Pomodoro', 'Short Break', 'Long Break'];
    const formattedMinutes = String(getTickingTime()).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    document.title = `${STATE_FLOW[stage]} - ${formattedMinutes}:${formattedSeconds}`;
  }, [stage, seconds, getTickingTime]);

  const updateTimerSettings = (newSettings) => {
    setPomodoro(Number(newSettings.pomodoro));
    setShortBreak(Number(newSettings.shortBreak));
    setLongBreak(Number(newSettings.longBreak));
  };

  return (
    <Router>
      <div className="mt-5 font-inter flex flex-col justify-center">
        <div className="max-w-2xl mx-auto flex items-center justify-between w-full px-14">
          <div className="text-black font-bold font-mono text-center pt-3">
            Sessions Completed: {sessionsDone}
          </div>
          <Navigation setOpenSetting={setOpenSetting} />
        </div>
        <div className="md-7 mt-2 flex gap-4 p-1">
          <Routes>
            <Route path="/" element={
              <>
                <Timer 
                  switchStage={switchStage}
                  getTickingTime={getTickingTime}
                  stage={stage}
                  ticking={ticking}
                  startTimer={startTimer}
                  seconds={seconds}
                  isTimeUp={isTimeUp}
                  reset={reset}
                />
                <ModalSettings
                  openSetting={openSetting}
                  setOpenSetting={setOpenSetting}
                  pomodoroRef={pomodoroRef}
                  shortBreakRef={shortBreakRef}
                  longBreakRef={longBreakRef}
                  updateTimeDefaultValue={updateTimeDefaultValue}
                />
              </>
            } />
            <Route path="/settings" element={<Settings updateTimerSettings={updateTimerSettings} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
