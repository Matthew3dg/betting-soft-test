import React from 'react';

import { Button } from '../../shared/ui/Button/Button';
import { TextInput } from '../../shared/ui/TextInput/TextInput';
import styles from '../header/Header.module.scss';

interface Props {
  search: string;
  onChangeSearch: (v: string) => void;
  onSearch: () => void;
}

export const SearchPanel: React.FC<Props> = ({ search, onChangeSearch, onSearch }) => {
  return (
    <div className={styles.searchPanel}>
      <div className={styles.searchCol}>
        <div className={styles.label}>Search</div>
        <div className={styles.searchRow}>
          <TextInput
            withIconSrc={`${process.env.PUBLIC_URL}/icons/search.svg`}
            placeholder="Search"
            value={search}
            onChange={(e) => onChangeSearch(e.target.value)}
          />
          <Button onClick={onSearch}>SEARCH</Button>
        </div>
      </div>
    </div>
  );
};
