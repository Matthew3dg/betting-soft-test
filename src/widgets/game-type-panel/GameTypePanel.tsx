import React from 'react';

import { Select } from '../../shared/ui/Select/Select';
import styles from '../header/Header.module.scss';

interface Props {
  gameTypeId?: string;
  types: string[];
  onChange: (v?: string) => void;
}

export const GameTypePanel: React.FC<Props> = ({ gameTypeId, types, onChange }) => {
  const options = [{ value: '', label: 'All' }, ...types.map((t) => ({ value: t, label: t }))];
  return (
    <div className={styles.gameTypePanel}>
      <div className={styles.label}>Game Type</div>
      <Select
        value={gameTypeId ?? ''}
        onChange={(e) => onChange((e.target as HTMLSelectElement).value || undefined)}
        options={options}
      />
    </div>
  );
};
