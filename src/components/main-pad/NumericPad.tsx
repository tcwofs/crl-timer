import { Button, FormControl, OutlinedInput } from '@material-ui/core';
import React from 'react';
import MaskedInput from 'react-text-mask';
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
      mask={[/\d/, /\d/, 'h', 'h', ':', /\d/, /\d/, 'm', 'm', ':', /\d/, /\d/, 's', 's']}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

interface State {
  textmask: string;
}

export default () => {
  const [values, setValues] = React.useState<State>({ textmask: '00hh:00mm:00ss' });

  const handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  return (
    <div id='numericpad'>
      <FormControl variant='outlined'>
        <OutlinedInput
          id='formatted-text-mask-input'
          value={values.textmask}
          onChange={handleChange('textmask')}
          inputComponent={TextMaskCustom as any}
          autoComplete='false'
        />
      </FormControl>
      <Button id='text-input-button' variant='contained' color='primary'>
        Start
      </Button>
    </div>
  );
};
