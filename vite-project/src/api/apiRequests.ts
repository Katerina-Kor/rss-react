import { PeopleResponse } from '../types/apiResponseTypes';

const basePeopleURL: string = 'https://the-one-api.dev/v2/character';
const token = import.meta.env.VITE_LORDOFRINGS_API_KEY || '';

const getPeopleData = async (
  pageNumber: number = 1,
  searchString: string | null = null,
  limit: number = 10,
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
  const dataResponse: Promise<PeopleResponse> = await request.json();

  return dataResponse;
};

export { getPeopleData };
