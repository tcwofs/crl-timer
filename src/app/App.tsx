import React from 'react';
import { BackgroundAnimation, NumericPad, TimerPad } from '../components';

import './App.css';

const App: React.FC = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
      <BackgroundAnimation />
      <NumericPad />
      <TimerPad />
    </div>
  );
};

export default App;
