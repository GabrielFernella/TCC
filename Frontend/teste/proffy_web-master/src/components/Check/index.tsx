import React, { InputHTMLAttributes } from 'react'

import './styles.scss'

interface CheckProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
}

const Check: React.FunctionComponent<CheckProps> = ({
  label,
  name,
  ...rest
}) => {
  return (
    <div className="check-block">
      <input type="checkbox" id={name} {...rest} />
      <label htmlFor={name}>{label}</label>
    </div>
  )
}

export default Check
