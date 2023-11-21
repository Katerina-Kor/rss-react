import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { DetailedPersonResponse } from '../types/apiResponseTypes';

export const detailedCardAPI = createApi({
  reducerPath: 'detailedCardAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://the-one-api.dev/v2',
    prepareHeaders: (headers) => {
      const token = import.meta.env.VITE_LORDOFRINGS_API_KEY || '';
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    fetchDetailedCard: build.query<DetailedPersonResponse, string>({
      query: (id: string) => ({
        url: `/character/${id}`,
      }),
    }),
  }),
});
