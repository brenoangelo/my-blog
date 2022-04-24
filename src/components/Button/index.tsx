import React from 'react';

import styles from './styles.module.scss'

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
  icon?: any;
  isFilled?: boolean;
}

export function Button({ text, icon: Icon, isFilled = false, ...rest }: ButtonProps) {
  return (
    <button {...rest} className={`${styles.button} ${isFilled && styles.isFilled}`}>
      {text}
      {Icon ?? ''}
    </button>
  );
}
