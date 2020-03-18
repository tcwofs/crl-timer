import React, { createContext, useState } from 'react';
import { NumericPad, TimerCountdown } from '../index';
import './TimerMain.css';

export const TimerContext = createContext({
  startTimer: () => {
    return;
  },
});

export default () => {
  const [timer, setTimer] = useState(false);
  // TODO: create time variable and conver everything there into seconds
  const startTimer = () => setTimer(!timer);

  return (
    <TimerContext.Provider value={{ startTimer }}>
      <div id='timermain'>{!timer ? <NumericPad /> : <TimerCountdown />}</div>
    </TimerContext.Provider>
  );
};
