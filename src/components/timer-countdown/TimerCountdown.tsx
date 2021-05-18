import { Button, Grid, Paper, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { TimerContext } from '../main-timer/TimerMain';
import './TimerCountdown.css';

const TimerCountdown = (props: any) => {
  const { switchTimer } = useContext(TimerContext);
  const [hours, minutes, seconds]: [number, number, number] = props.time;
  const [time, setTime] = useState(+hours * 60 * 60 + +minutes * 60 + +seconds);

  useEffect(() => {
    if (!time) {
      alert('time is up!');
      return;
    }

    const intervalId = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  return (
    <Paper id='paper'>
      <Grid container>
        {time === 0 ? (
          <Grid item xs={12} id='gridText'>
            <Typography align='center' color='error' variant='h5'>
              time is up!
            </Typography>
          </Grid>
        ) : (
          <></>
        )}
        <Grid item xs={12} id='gridText'>
          <Typography align='center' color='textPrimary' variant='h5'>{`${String(Math.floor(time / 3600)).padStart(2, '0')} : ${String(
            Math.floor((time % 3600) / 60)
          ).padStart(2, '0')} : ${String(time % 60).padStart(2, '0')}`}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button id='text-input-button' variant='contained' color='primary' onClick={() => switchTimer('return')}>
            back
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TimerCountdown;
