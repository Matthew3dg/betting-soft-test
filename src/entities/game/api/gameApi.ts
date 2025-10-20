import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from '../../../shared/api/env';
import type { GameListResponse } from '../model/types';

export const gameApi = createApi({
  reducerPath: 'gameApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getGameList: builder.query<GameListResponse, void>({
      query: () => ({
        url: `/pragmatic/game/list`,
        params: { partner_name: 'belparyaj' },
      }),
    }),
  }),
});

export const { useGetGameListQuery, useLazyGetGameListQuery } = gameApi;
