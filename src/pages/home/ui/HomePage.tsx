import React, { useEffect, useMemo, useRef, useState } from 'react';

import styles from './HomePage.module.scss';
import { useLazyGetGameListQuery } from '../../../entities/game/api/gameApi';
import type { GameItem } from '../../../entities/game/model/types';
// Note: debounced search removed per requirements; filtering happens on Search click.
import { GameCard } from '../../../entities/game/ui/GameCard/GameCard';

export const HomePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [gameTypeId, setGameTypeId] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<GameItem[]>([]);
  const [trigger, result] = useLazyGetGameListQuery();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [appliedSearch, setAppliedSearch] = useState('');

  // Fetch list when filters change (server params to be added later)
  useEffect(() => {
    // initial load only
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
      <div className={styles.header}>
        {/* Game Type block */}
        <div className={styles.gameTypePanel}>
          <div className={styles.label}>Game Type</div>
          <div className={styles.selectWrap}>
            <select
              className={styles.selectNative}
              value={gameTypeId ?? ''}
              onChange={(e) => setGameTypeId(e.target.value || undefined)}
            >
              <option value="">All</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <span className={styles.selectIcon} aria-hidden>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path
                  d="M15.4679 18.2888L20.8073 13.1667C20.9358 13.0435 21 12.8938 21 12.7178C21 12.5418 20.9358 12.3922 20.8073 12.269L20.2018 11.6881C20.0734 11.5649 19.9174 11.5033 19.7339 11.5033C19.5505 11.4857 19.3945 11.5385 19.2661 11.6617L15 15.7541L10.7339 11.6617C10.6055 11.5385 10.4495 11.4857 10.2661 11.5033C10.0826 11.5033 9.92661 11.5649 9.79817 11.6881L9.19266 12.269C9.06422 12.3922 9 12.5418 9 12.7178C9 12.8938 9.06422 13.0435 9.19266 13.1667L14.5321 18.2888C14.6606 18.4296 14.8165 18.5 15 18.5C15.1835 18.5 15.3395 18.4296 15.4679 18.2888Z"
                  fill="white"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* Search block */}
        <div className={styles.searchPanel}>
          <div className={styles.searchCol}>
            <div className={styles.label}>Search</div>
            <div className={styles.searchRow}>
              <div className={styles.searchInputWrap}>
                <span className={styles.searchIcon} aria-hidden>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <g clipPath="url(#clip0)">
                      <path
                        d="M19.9399 18.5624L13.4474 12.0699C14.4549 10.7675 14.9999 9.17496 14.9999 7.49997C14.9999 5.49498 14.2174 3.61498 12.8024 2.19749C11.3874 0.779996 9.50246 0 7.49997 0C5.49748 0 3.61248 0.782496 2.19749 2.19749C0.779996 3.61248 0 5.49498 0 7.49997C0 9.50246 0.782496 11.3874 2.19749 12.8024C3.61248 14.2199 5.49498 14.9999 7.49997 14.9999C9.17496 14.9999 10.765 14.4549 12.0674 13.4499L18.5599 19.9399C18.579 19.959 18.6016 19.9741 18.6264 19.9844C18.6513 19.9947 18.678 20 18.7049 20C18.7318 20 18.7585 19.9947 18.7834 19.9844C18.8083 19.9741 18.8309 19.959 18.8499 19.9399L19.9399 18.8524C19.959 18.8334 19.9741 18.8108 19.9844 18.7859C19.9947 18.761 20 18.7343 20 18.7074C20 18.6805 19.9947 18.6538 19.9844 18.6289C19.9741 18.6041 19.959 18.5815 19.9399 18.5624ZM11.46 11.46C10.4 12.5174 8.99496 13.0999 7.49997 13.0999C6.00497 13.0999 4.59998 12.5174 3.53998 11.46C2.48249 10.4 1.89999 8.99496 1.89999 7.49997C1.89999 6.00497 2.48249 4.59748 3.53998 3.53998C4.59998 2.48249 6.00497 1.89999 7.49997 1.89999C8.99496 1.89999 10.4025 2.47999 11.46 3.53998C12.5174 4.59998 13.0999 6.00497 13.0999 7.49997C13.0999 8.99496 12.5174 10.4025 11.46 11.46Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <input
                  className={styles.searchInput}
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button
                className={styles.searchButton}
                onClick={() => {
                  setAppliedSearch(search);
                  setPage(1);
                }}
              >
                SEARCH
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Provider row */}
      <div className={styles.providerRow}>
        <div className={styles.providerIconBox} aria-hidden>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="30"
            viewBox="0 0 21 30"
            fill="none"
          >
            <path
              d="M11.668 11.6884C8.46589 11.8902 9.90369 16.1194 13.4438 15.8962C16.9067 15.6779 15.0798 11.4734 11.668 11.6884Z"
              fill="#F19021"
            />
            <path
              d="M10.3164 9.07628C8.27602 9.07628 6.28145 9.68986 4.58492 10.8394C2.8884 11.989 1.56612 13.6229 0.785292 15.5346C0.00446753 17.4462 -0.199829 19.5497 0.198232 21.5791C0.596294 23.6085 1.57883 25.4727 3.02161 26.9358C4.46439 28.3989 6.3026 29.3953 8.30379 29.799C10.305 30.2026 12.3793 29.9955 14.2643 29.2036C16.1494 28.4118 17.7606 27.0709 18.8942 25.3504C20.0278 23.63 20.6328 21.6073 20.6328 19.5381C20.6328 16.7635 19.5459 14.1025 17.6112 12.1405C15.6765 10.1785 13.0525 9.07628 10.3164 9.07628ZM10.3164 28.9036C8.49027 28.9039 6.70505 28.355 5.18651 27.3264C3.66798 26.2978 2.48433 24.8356 1.78528 23.1248C1.08622 21.414 0.903151 19.5313 1.25922 17.715C1.61528 15.8987 2.49449 14.2302 3.78566 12.9206C5.07682 11.611 6.72194 10.7191 8.51297 10.3577C10.304 9.99628 12.1605 10.1816 13.8477 10.8902C15.5348 11.5988 16.9769 12.7989 17.9915 14.3387C19.006 15.8784 19.5476 17.6887 19.5476 19.5406C19.5476 22.0235 18.5751 24.4048 16.8439 26.1606C15.1128 27.9165 12.7648 28.9031 10.3164 28.9036ZM10.0053 1.77275C7.55617 3.65012 7.98182 6.52919 7.98182 6.52919C7.98182 6.52919 6.44248 2.47707 4.44337 0C4.17368 3.18881 5.15902 7.41392 5.15902 7.41392C5.15902 7.41392 3.90724 4.79433 0.839939 4.6477C3.38411 6.13048 4.37108 8.80197 4.5969 9.51864C6.11305 8.56957 7.8469 8.03751 9.62757 7.9749C9.42693 7.30765 8.71372 4.49613 10.0053 1.77275Z"
              fill="#F19021"
            />
          </svg>
        </div>
        <div className={styles.providerTitle}>Pragmatic play</div>
      </div>

      <div className={styles.grid}>
        {items.map((g) => (
          <GameCard key={g.gameID} game={g} />
        ))}
      </div>

      <div ref={sentinelRef} />
      {result.isFetching && <div className={styles.loader}>Loading…</div>}
    </div>
  );
};
