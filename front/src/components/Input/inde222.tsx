import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import InputMask from 'react-input-mask';
import { useField } from '@unform/core';

import './styles.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  stacked?: boolean;
  mask?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  stacked = false,
  name,
  mask,
  ...rest
}) => {
  /* const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, registerField, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]); */

  return (
    <div className={`input-block ${stacked && 'input-stacked'}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <InputMask
        id={name}
        mask={mask || ''}
        /* ref={inputRef}
        defaultValue={defaultValue} */
        {...rest}
      />
    </div>
  );
};

export default Input;

/*
import React, { InputHTMLAttributes, useEffect } from 'react';
import { useField } from '@unform/core';

import './styles.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  stacked?: boolean;
}

const Input: React.FunctionComponent<InputProps> = ({
  label,
  stacked = false,
  name,
  ...rest
}) => {
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {}, []);

  return (
    <div className={`input-block ${stacked && 'input-stacked'}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input type="text" id={name} {...rest} />
    </div>
  );
};

export default Input;


*/
