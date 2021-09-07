import React, { InputHTMLAttributes, useCallback } from 'react';

import { currency, money, number, moeda, cpf } from './masks';

import './styles.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  mask?: 'currency' | 'number' | 'money' | 'moeda' | 'cpf';
  prefix?: string;
}

const Input: React.FC<InputProps> = ({
  mask,
  name,
  label,
  prefix,
  ...rest
}) => {
  const handleKeyUp = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (mask === 'currency') {
        currency(e);
      }
      if (mask === 'money') {
        money(e);
      }
      if (mask === 'number') {
        number(e);
      }
      if (mask === 'moeda') {
        moeda(e);
      }
      if (mask === 'cpf') {
        cpf(e);
      }
    },
    [mask],
  );

  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} onKeyUp={handleKeyUp} {...rest} />
    </div>
  );
};

export default Input;
