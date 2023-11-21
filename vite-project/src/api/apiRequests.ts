// import { store } from '../store/store';
import {
  DetailedPersonResponse,
  PeopleResponse,
} from '../types/apiResponseTypes';
// import { cardsSlice } from '../store/reducers/itemsNumberSlice';
// import { AnyAction, Dispatch } from '@reduxjs/toolkit';

const basePeopleURL: string = 'https://the-one-api.dev/v2/character';
const token = import.meta.env.VITE_LORDOFRINGS_API_KEY || '';

// export const fetchData = (
//   pageNumber: string,
//   searchString: string | null = null,
//   limit: string = '30',
//   signal: AbortSignal | null = null
// ) => async (dispatch: typeof store['dispatch']) => {  //typeof store['dispatch']
//   try {
//     dispatch(cardsSlice.actions.cardsFetching());
//     const currentURL = searchString
//       ? `${basePeopleURL}?limit=${limit}&page=${pageNumber}&name=/${searchString}/i`
//       : `${basePeopleURL}?limit=${limit}&page=${pageNumber}`;
//     // const currentURL = `${basePeopleURL}?limit=30&page=1&name=/gan/i`
//     const request: Response = await fetch(currentURL, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       signal,
//     });
//     if (request.status !== 200) {
//       throw new Error(request.statusText);
//     }
//     const dataResponse: PeopleResponse = await request.json();
//     dispatch(cardsSlice.actions.cardsFetchingSuccess(dataResponse.docs))

//   } catch (error) {
//     dispatch(cardsSlice.actions.cardsFetchingError((error as Error).message))
//   }
// }

const getPeopleData = async (
  pageNumber: string,
  searchString: string | null = null,
  limit: string = '30',
  signal: AbortSignal | null = null
) => {
  const currentURL = searchString
    ? `${basePeopleURL}?limit=${limit}&page=${pageNumber}&name=/${searchString}/i`
    : `${basePeopleURL}?limit=${limit}&page=${pageNumber}`;
  const request: Response = await fetch(currentURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal,
  });
  if (request.status !== 200) {
    throw new Error(request.statusText);
  }
  const dataResponse: PeopleResponse = await request.json();

  return dataResponse;
};

const getDetailedPersonData = async (
  id: string,
  signal: AbortSignal | null = null
) => {
  const currentUrl = `${basePeopleURL}/${id}`;
  const request: Response = await fetch(currentUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal,
  });
  const dataResponse: DetailedPersonResponse = await request.json();

  return dataResponse;
};

export { getPeopleData, getDetailedPersonData };
