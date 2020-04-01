import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import React, { createContext, useState } from 'react';
import { NumericPad, TimerCountdown } from '../index';
import './TimerMain.css';

export const TimerContext = createContext({
  switchTimer: (recievedTime: string) => {
    return;
  },
});

export default () => {
  const [timer, setTimer] = useState(false);
  const [time, setTime] = useState<Array<string> | null>([]);

  const colortheme = createMuiTheme({
    palette: {
      primary: { main: '#00695c', contrastText: '#e6e6e6' },
      secondary: { main: '#e91e63', contrastText: '#e6e6e6' },
      text: { primary: '#e6e6e6' },
    },
  });

  const switchTimer = (recievedTime: string) => {
    if (recievedTime === '00:00:00') return;
    if (recievedTime === 'return') setTimer(!timer);
    setTime(recievedTime.match(/(\d[\d.]*)/g));
    setTimer(!timer);
  };

  return (
    <MuiThemeProvider theme={colortheme}>
      <TimerContext.Provider value={{ switchTimer }}>
        <div id='timermain'>{!timer ? <NumericPad /> : <TimerCountdown time={time} />}</div>
      </TimerContext.Provider>
    </MuiThemeProvider>
  );
};
