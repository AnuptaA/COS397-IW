import React, { useState, useEffect } from "react";
import internal from "stream";

/**
 * @param points: point count per question
 * @constant CONVERSION: conversion factor (seconds per question)
 */

const CONVERSION = 108;

interface TimerProps {
  points: number;
}

const Timer: React.FC<TimerProps> = ({ points }) => {
  const [on, setOn] = useState(false);
  const [remTime, setRemTime] = useState(points * CONVERSION);
  const [display, setDisplay] = useState("00:00:00");
  const [startTxt, setStartTxt] = useState("START");

  const handleStart = () => {
    if (remTime > 0) {
        if (!on) {
            setOn(true);
            setStartTxt("PAUSE");
        }
        else {
            setOn(false);
            setStartTxt("START");
        }
    }
  };

  const handleReset = () => {
    setOn(false);
    setRemTime(points * CONVERSION);
    setDisplay(getDisplayTime());
  };

  const getDisplayTime = () => {
    const hours = Math.floor(remTime / 3600);
    const minutes = Math.floor((remTime % 3600) / 60);
    const seconds = remTime % 60;
    const strHours = hours > 9 ? "" + hours : "0" + hours;
    const strMinutes = minutes > 9 ? "" + minutes : "0" + minutes;
    const strSeconds = seconds > 9 ? "" + seconds : "0" + seconds;
    return strHours + ":" + strMinutes + ":" + strSeconds;
  };

  useEffect(() => {
    if (!on || remTime <= 0) return;

    const interval = setInterval(() => {
      setRemTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setOn(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [on, remTime]);

  useEffect(() => {
    if (remTime > 0) setDisplay(getDisplayTime());
    else setDisplay("00:00:00");
  });

  return (
    <div className="timer-box-cont">
      <div className="time-cont">
        <span id="time">{display}</span>
      </div>
      <div className="time-btns">
        <button onClick={handleStart}>{startTxt}</button>
        <button onClick={handleReset}>RESET</button>
      </div>
    </div>
  );
};

export default Timer;
