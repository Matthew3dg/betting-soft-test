import React from 'react';

import styles from './ProviderRow.module.scss';

export const ProviderRow: React.FC = () => {
  return (
    <div className={styles.row}>
      <div className={styles.iconBox} aria-hidden>
        <img src={`${process.env.PUBLIC_URL}/icons/provider.svg`} width={21} height={30} alt="" />
      </div>
      <div className={styles.title}>Pragmatic play</div>
    </div>
  );
};
