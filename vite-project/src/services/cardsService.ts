import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PeopleResponse } from '../types/apiResponseTypes';

type argsType = {
  limit: string;
  page: string;
  name: string;
};
export const cardsAPI = createApi({
  reducerPath: 'cardsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://the-one-api.dev/v2',
    prepareHeaders: (headers) => {
      const token = import.meta.env.VITE_LORDOFRINGS_API_KEY || '';
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    fetchCards: build.query<PeopleResponse, argsType>({
      query: (arg: argsType) => ({
        url: '/character',
        params: {
          limit: arg.limit,
          page: arg.page,
          name: RegExp(arg.name, 'i'),
        },
      }),
    }),
  }),
});
