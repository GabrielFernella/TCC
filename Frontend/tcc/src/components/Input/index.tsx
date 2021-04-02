import React, { InputHTMLAttributes } from 'react';

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
  return (
    <div className={`input-block ${stacked && 'input-stacked'}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input type="text" id={name} {...rest} />
    </div>
  );
};

export default Input;
