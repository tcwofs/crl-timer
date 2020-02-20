import React from 'react';
import { BackgroundAnimation, TimerPad } from '../components';
import './App.css';

const App: React.FC = () => {
  return (
    <div className='App'>
      <TimerPad />
      <BackgroundAnimation />
    </div>
  );
};

export default App;
