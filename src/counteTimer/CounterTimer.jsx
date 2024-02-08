import React, { useState, useEffect } from "react";
import "./CounterTimer.css";

function CounterTimer() {
  const [time, setTime] = useState(0);
  const [intialTime, setIntialTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isActive && time > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(intervalId);
      setIsActive(false);
    }

    return () => clearInterval(intervalId);
  }, [isActive, time]);

  const handleStartStop = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const handleReset = () => {
    setTime(intialTime);
    setIsActive(false);
  };

  const handleChange = (e) => {
    // setIntialTime(parseInt(e.target.value, 10));
    // setTime(parseInt(e.target.value, 10));

    const newValue = e.target.value.trim();

    if (newValue === "" || isNaN(newValue)) {
      setIntialTime();
      setTime(0);
    } else {
      const parsedValue = parseInt(newValue, 10);
      setIntialTime(parsedValue);
      setTime(parsedValue);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes} mins : ${seconds < 10 ? "0" : ""}${seconds} secs`;
  };

  return (
    <div className="countdown-container">
      <h1>Countdown Timer</h1>
      <div className="controls">
        <input
          type="number"
          value={intialTime}
          onChange={handleChange}
          disabled={isActive}
        />
        <button className="start-stop" onClick={handleStartStop}>
          {isActive ? "Stop" : "Start"}
        </button>
        <button className="reset" onClick={handleReset} disabled={isActive}>
          Reset
        </button>
      </div>
      <div className="timer">
        <h2>TIME REMAINING: {formatTime(time)} </h2>
      </div>
    </div>
  );
}
export default CounterTimer;
