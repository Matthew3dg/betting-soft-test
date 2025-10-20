import React from 'react';

import styles from './GameCard.module.scss';
import { IMAGE_BASE_URL } from '../../../../shared/api/env';
import type { GameItem } from '../../model/types';

interface Props {
  game: GameItem;
}

export const GameCard: React.FC<Props> = ({ game }) => {
  const src = `${IMAGE_BASE_URL}/game_pic/square/200/${game.gameID}.png`;
  return (
    <div className={styles.card} title={game.gameName}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={src} alt={game.gameName} loading="lazy" />
      </div>
      <div className={styles.title}>{game.gameName}</div>
    </div>
  );
};
