import React from 'react';
import { BackgroundAnimation, NumericPad } from '../components';
import './App.css';

const App: React.FC = () => {
  return (
    <div className='App'>
      <NumericPad />
      <BackgroundAnimation />
    </div>
  );
};

export default App;
