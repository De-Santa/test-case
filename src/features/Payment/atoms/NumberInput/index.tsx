import React from 'react';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';

interface INumberFormatCustom {
  inputRef: (instance: NumberFormat | null) => void;
  max?: number,
  min?: number,
  onChange: (event: { target: { value: string } }) => void;
}

const NumberFormatCustom:React.FC<INumberFormatCustom> = (props) => {
  const { inputRef, max, min, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      isAllowed={(values) => {
        const {floatValue} = values;
        if (floatValue === undefined) return true;

        const maxIsNum = !isNaN(Number(max));
        const minIsNum = !isNaN(Number(min));

        if (maxIsNum && minIsNum) {
          // @ts-ignore
          return floatValue >= min && floatValue <= max;
        }
        if (maxIsNum) {
          // @ts-ignore
          return floatValue <= max;
        }
        if (minIsNum) {
          // @ts-ignore
          return floatValue <= max;
        }
        return true
      }}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
};

interface NumberInputI {
  error: boolean,
  helperText?: string,
  label: string,
  max?: number,
  min?: number,
  name: string,
  prefix?: string,
  onChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>):void,
  value: string
}

export const NumberInput:React.FC<NumberInputI> = (props) => {
  const {
    error, helperText, label, max, min, name, onChange,
    prefix, value
  } = props;

  return (
    <TextField
      error={error}
      helperText={helperText}
      label={label}
      name={name}
      onChange={onChange}
      value={value}
      InputProps={{
        inputComponent: NumberFormatCustom as any,
        inputProps: { max, min, prefix }
      }}
    />
  )
};
