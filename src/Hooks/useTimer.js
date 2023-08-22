import { useState, useEffect } from "react";

const useTimer = (initialTime = 0) => {
  const [seconds, setSeconds] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  const start = () => {
    setIsActive(true);
  };

  const restart = () => {
    setSeconds(initialTime);
    setIsActive(false);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== initialTime) {
      clearInterval(interval);
    }
    if (seconds === 0) {
      alert("Time is up!");
      setSeconds(0)
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return [minutes, remainingSeconds, start, restart];
};

export default useTimer;
