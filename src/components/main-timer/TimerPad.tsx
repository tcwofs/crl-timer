import React, { Component } from 'react';
import { NumericPad } from '../index';
import './TimerPad.css';

export default class TimerPad extends Component {
  render() {
    return (
      <div>
        <p>timerpad</p>
        <NumericPad />
      </div>
    );
  }
}
