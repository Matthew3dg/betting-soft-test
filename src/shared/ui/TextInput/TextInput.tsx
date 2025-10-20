import React from 'react';

import styles from './TextInput.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  withIconSrc?: string;
}

export const TextInput: React.FC<Props> = ({ withIconSrc, className, ...rest }) => {
  return (
    <div className={`${styles.wrap}${className ? ` ${className}` : ''}`}>
      {withIconSrc ? (
        <span className={styles.icon} aria-hidden>
          <img src={withIconSrc} width={20} height={20} alt="" />
        </span>
      ) : null}
      <input className={styles.input} {...rest} />
    </div>
  );
};
