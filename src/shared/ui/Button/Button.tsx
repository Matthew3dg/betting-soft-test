import React from 'react';

import styles from './Button.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <button className={`${styles.root}${className ? ` ${className}` : ''}`} {...rest}>
      {children}
    </button>
  );
};
