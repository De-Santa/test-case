import React from 'react';
import ReactMaskedInput from 'react-text-mask';
import TextField from '@material-ui/core/TextField';

interface ITextMaskCustom {
  inputRef: (ref: HTMLInputElement | null) => void;
}

const TextMaskCustom:React.FC<ITextMaskCustom> = (props) => {
  const { inputRef, ...other } = props;
  return (
    <ReactMaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      showMask
    />
  );
};

interface MaskedInputI {
  error: boolean,
  helperText?: string,
  label: string,
  mask: Array<any>,
  name: string,
  onChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>):void,
  type?:string,
  value: string
}

export const MaskedInput:React.FC<MaskedInputI> = (props) => {
  const { error, helperText, label, mask, name, onChange, type, value } = props;
  return (
    <TextField
      error={error}
      helperText={helperText}
      label={label}
      name={name}
      onChange={onChange}
      type={type}
      value={value}
      InputProps={{
        inputComponent: TextMaskCustom as any,
        inputProps: { mask }
      }}
    />
  )
};
