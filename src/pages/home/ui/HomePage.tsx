import React, { useEffect, useMemo, useRef, useState } from 'react';

import styles from './HomePage.module.scss';
import { useLazyGetGameListQuery } from '../../../entities/game/api/gameApi';
import type { GameItem } from '../../../entities/game/model/types';
// Note: debounced search removed per requirements; filtering happens on Search click.
import { GameCard } from '../../../entities/game/ui/GameCard/GameCard';
import { EmptyState } from '../../../shared/ui/EmptyState/EmptyState';
import { Loading } from '../../../shared/ui/Loading/Loading';
import { Header } from '../../../widgets/header/Header';
import { ProviderRow } from '../../../widgets/provider-row/ProviderRow';

export const HomePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [gameTypeId, setGameTypeId] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<GameItem[]>([]);
  const [trigger, result] = useLazyGetGameListQuery();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [appliedSearch, setAppliedSearch] = useState('');

  // Fetch list on mount
  useEffect(() => {
    trigger();
  }, [trigger]);

  // Filtered list and current page slice (client-side until server paging provided)
  const filtered = useMemo(() => {
    const all = result.data?.result ?? [];
    const text = appliedSearch.trim().toLowerCase();
    return all.filter((g) => {
      const matchText = text
        ? g.gameName.toLowerCase().includes(text) || g.gameID.toLowerCase().includes(text)
        : true;
      const matchType = gameTypeId ? g.gameTypeID === gameTypeId : true;
      return matchText && matchType;
    });
  }, [result.data, appliedSearch, gameTypeId]);

  useEffect(() => {
    const pageSize = 30;
    const slice = filtered.slice(0, page * pageSize);
    setItems(slice);
  }, [filtered, page]);

  // Infinite scroll observer with guard
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const hasMore = items.length < filtered.length;
        if (entry.isIntersecting && hasMore && !result.isFetching) {
          setPage((p) => p + 1);
        }
      },
      { root: null, rootMargin: '200px 0px', threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [items.length, filtered.length, result.isFetching]);

  const types = useMemo(() => {
    const set = new Set(result.data?.result.map((g) => g.gameTypeID) ?? []);
    return Array.from(set);
  }, [result.data]);

  return (
    <div className={`container ${styles.root}`} ref={containerRef}>
      <Header
        gameTypeId={gameTypeId}
        onChangeGameType={setGameTypeId}
        search={search}
        onChangeSearch={setSearch}
        onSearch={() => {
          setAppliedSearch(search);
          setPage(1);
        }}
        types={types}
      />

      <ProviderRow />

      <div className={styles.grid}>
        {items.map((g) => (
          <GameCard key={g.gameID} game={g} />
        ))}
      </div>

      <div ref={sentinelRef} />
      {items.length === 0 && !result.isFetching && <EmptyState />}
      {result.isFetching && <Loading />}
    </div>
  );
};
