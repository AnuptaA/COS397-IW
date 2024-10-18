import React, { useState, useEffect } from "react";

/**
 * @param points: point count per question
 * @param isAnswered: boolean indicating timer status; true indicates
 * answered correctly, false indicates unanswered/incorrect
 * @param setIsExpired: useState function for changing status of isExpired
 * boolean; true indicates time has expired, false indicates time remaining
 *
 * @constant CONVERSION: numerical conversion factor (seconds per question)
 */

const CONVERSION = 108;

type TimerProps = {
  points: number;
  isAnswered: boolean;
  setIsExpired: React.Dispatch<React.SetStateAction<boolean>>;
};

const Timer = ({ points, isAnswered, setIsExpired }: TimerProps) => {
  const [on, setOn] = useState<boolean>(false);
  const [remTime, setRemTime] = useState<number>(points * CONVERSION);
  const [display, setDisplay] = useState<string>("00:00:00");
  const [startText, setStartText] = useState<string>("START");

  // Helper function returning remaining time in XX::XX:XX format
  const getDisplayTime = () => {
    const hours = Math.floor(remTime / 3600);
    const minutes = Math.floor((remTime % 3600) / 60);
    const seconds = remTime % 60;
    const strHours = hours > 9 ? "" + hours : "0" + hours;
    const strMinutes = minutes > 9 ? "" + minutes : "0" + minutes;
    const strSeconds = seconds > 9 ? "" + seconds : "0" + seconds;
    return strHours + ":" + strMinutes + ":" + strSeconds;
  };

  // Function handling when start timer button is clicked
  const handleStart = () => {
    // if questiion has not been correctly answered
    if (isAnswered) return;

    if (remTime > 0) {
      if (!on) {
        // if there is time remaining, start timer
        setOn(true);
        setStartText("PAUSE");
      } else {
        // pause timer
        setOn(false);
        // setIsExpired(true);
        setStartText("START");
      }
    }
  };

  const handleReset = () => {
    // if question is answered correctly, do nothing
    if (isAnswered) return;

    // reset variables
    setOn(false);
    setIsExpired(false);
    setRemTime(points * CONVERSION);
    setDisplay(getDisplayTime());
    setStartText("START");
  };

  // Stop the timer if the correct answer has been submitted
  useEffect(() => {
    if (isAnswered) {
      setOn(false);
      setStartText("START");
    }
  }, [isAnswered]);

  // Decrement time by 1 second per second while there is time left and
  // the timer is on
  useEffect(() => {
    if (!on || remTime <= 0) return;

    const interval = setInterval(() => {
      setRemTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsExpired(true);
          setOn(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [on, remTime]);

  // Change display time every clock tick
  useEffect(() => {
    if (remTime > 0) setDisplay(getDisplayTime());
    else setDisplay("00:00:00");
  }, [remTime]);

  // Set initial display time upon load
  useEffect(() => {
    setRemTime(points * CONVERSION);
    setDisplay(getDisplayTime());
  }, [points]);

  return (
    <div className="timer-box-cont">
      <div className="time-cont">
        <span id="time">{display}</span>
      </div>
      <div className="time-btns">
        <button onClick={handleStart}>{startText}</button>
        <button onClick={handleReset}>RESET</button>
      </div>
    </div>
  );
};

export default Timer;
