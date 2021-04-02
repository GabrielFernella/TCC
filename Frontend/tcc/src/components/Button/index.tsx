import React, { ButtonHTMLAttributes } from 'react';
import './styles.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <>
      <button type="button" className={`button ${className}`} {...restProps}>
        {children}
      </button>
    </>
  );
};

Button.defaultProps = {
  className: '',
};

export default Button;
