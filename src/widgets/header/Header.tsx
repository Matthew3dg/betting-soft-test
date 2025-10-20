import React from 'react';

import styles from './Header.module.scss';
import { GameTypePanel } from '../game-type-panel/GameTypePanel';
import { SearchPanel } from '../search-panel/SearchPanel';

interface Props {
  gameTypeId?: string;
  onChangeGameType: (v?: string) => void;
  search: string;
  onChangeSearch: (v: string) => void;
  onSearch: () => void;
  types: string[];
}

export const Header: React.FC<Props> = ({
  gameTypeId,
  onChangeGameType,
  search,
  onChangeSearch,
  onSearch,
  types,
}) => {
  return (
    <div className={styles.header}>
      <GameTypePanel gameTypeId={gameTypeId} types={types} onChange={onChangeGameType} />

      <SearchPanel search={search} onChangeSearch={onChangeSearch} onSearch={onSearch} />
    </div>
  );
};
