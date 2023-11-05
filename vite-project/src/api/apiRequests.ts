import {
  DetailedPersonResponse,
  PeopleResponse,
} from '../types/apiResponseTypes';

const basePeopleURL: string = 'https://the-one-api.dev/v2/character';
const token = import.meta.env.VITE_LORDOFRINGS_API_KEY || '';

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
