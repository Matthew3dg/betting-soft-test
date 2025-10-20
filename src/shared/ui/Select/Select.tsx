import React from 'react';

import styles from './Select.module.scss';

interface Option {
  value: string;
  label: string;
}

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  iconSrc?: string;
}

export const Select: React.FC<Props> = ({
  options,
  iconSrc = `${process.env.PUBLIC_URL}/icons/Arrow.svg`,
  className,
  ...rest
}) => {
  return (
    <div className={`${styles.wrap}${className ? ` ${className}` : ''}`}>
      <select className={styles.native} {...rest}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <img className={styles.icon} src={iconSrc} alt="" width={30} height={30} />
    </div>
  );
};
