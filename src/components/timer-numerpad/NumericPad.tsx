import { Button, Grid, OutlinedInput, Paper, useTheme, useMediaQuery } from '@material-ui/core';
import React, { useContext } from 'react';
import MaskedInput from 'react-text-mask';
import { TimerContext } from '../main-timer/TimerMain';
import './NumericPad.css';

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => typeof ref;
}

function TextMaskCustom(props: TextMaskCustomProps) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/]}
      placeholderChar={'0'}
      showMask
    />
  );
}

interface State {
  textmask: string;
}

export default () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));
  const { switchTimer } = useContext(TimerContext);
  const [values, setValues] = React.useState<State>({ textmask: '00:00:00' });

  const addNumber = (number: string) => {
    setValues({ textmask: (values.textmask.replace(/:/g, '').slice(1) + number).replace(/^(\d{2})(\d{2})/, '$1:$2:') });
  };

  const handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  return (
    <Paper id='paper' style={{ width: matches ? '15vw' : '70vw' }}>
      <Grid container>
        <Grid item xs={12}>
          <OutlinedInput
            id='formatted-text-mask-input'
            value={values.textmask}
            onChange={handleChange('textmask')}
            inputComponent={TextMaskCustom as any}
            autoComplete='false'
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          {[
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
          ].map((array) => (
            <Grid key={array[0]} container justify='space-between' alignItems='center' spacing={1}>
              {array.map((value) => (
                <Grid key={value} item xs={4}>
                  <Button id='numeric-button' onClick={() => addNumber(value)}>
                    {value}
                  </Button>
                </Grid>
              ))}
            </Grid>
          ))}

          <Grid container justify='space-between' alignItems='center' spacing={1}>
            <Grid item xs={4}>
              <Button id='text-input-button' variant='contained' color='primary' onClick={() => switchTimer(values.textmask)}>
                Start
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button id='numeric-button' variant='contained' onClick={() => addNumber('0')}>
                0
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button id='text-input-button' variant='contained' color='secondary' onClick={() => setValues({ textmask: '00:00:00' })}>
                Clear
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
