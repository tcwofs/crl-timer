import { Button, Grid, OutlinedInput, Paper } from '@material-ui/core';
import React, { useContext } from 'react';
import MaskedInput from 'react-text-mask';
import { TimerContext } from '../main-timer/TimerMain';
import './NumericPad.css';

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
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
  const { startTimer } = useContext(TimerContext);
  const [values, setValues] = React.useState<State>({ textmask: '00:00:00' });

  const addNumber = (number: string) => {
    let tmpString = (number + values.textmask.replace(/:/g, '').slice(0, -1)).replace(/^(\d{2})(\d{2})/, '$1:$2:');
    setValues({ textmask: tmpString });
  };

  const handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  return (
    <div id='numericpad'>
      <Paper id='paper'>
        <Grid item xs={12}>
          <OutlinedInput
            id='formatted-text-mask-input'
            value={values.textmask}
            onChange={handleChange('textmask')}
            inputComponent={TextMaskCustom as any}
            autoComplete='false'
            fullWidth
          />

          {[
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
          ].map(array => (
            <Grid key={array[0]} container justify='space-between' alignItems='center' spacing={1}>
              {array.map(value => (
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
              <Button id='text-input-button' variant='contained' color='primary' onClick={startTimer}>
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
      </Paper>
    </div>
  );
};
