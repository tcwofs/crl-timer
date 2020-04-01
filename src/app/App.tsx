import React from 'react';
import { BackgroundAnimation, TimerMain } from '../components';
import './App.css';

const App: React.FC = () => {
  return (
    <div className='App'>
      <TimerMain />
      <BackgroundAnimation />
    </div>
  );
};

export default App;
