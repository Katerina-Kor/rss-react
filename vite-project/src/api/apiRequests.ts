import {
  PeopleResponse,
  PersonResponse,
  PlanetResponse,
} from '../types/apiResponseTypes';

const basePeopleURL: string = 'https://swapi.dev/api/people';
const basePlanetURL: string = 'https://swapi.dev/api/planets';

const getPeopleData = async (
  url: string = basePeopleURL,
  signal: AbortSignal | null = null
) => {
  const request: Response = await fetch(url, { signal });
  const dataResponse: Promise<PeopleResponse> = await request.json();

  return dataResponse;
};

const getSearchedPeopleData = async (
  searchString: string,
  signal: AbortSignal | null = null
) => {
  const url: string = `${basePeopleURL}/?search=${searchString}`;

  return (await getPeopleData(url, signal)).results;
};

const getWholePeopleData = async (signal: AbortSignal | null = null) => {
  let currentPage: number = 1;
  let currentUrl: string = `${basePeopleURL}/?page=${currentPage}`;

  let responseData: PeopleResponse = await getPeopleData(currentUrl, signal);
  const data: PersonResponse[] = responseData.results;

  while (responseData.next) {
    currentPage++;
    currentUrl = `${basePeopleURL}/?page=${currentPage}`;
    responseData = await getPeopleData(currentUrl, signal);
    data.push(...responseData.results);
  }

  return data;
};

const getPlanetData = async (url: string = basePlanetURL) => {
  const request: Response = await fetch(url);
  const dataResponse: Promise<PlanetResponse> = await request.json();

  return dataResponse;
};

const getData = async (value: string, signal: AbortSignal | null = null) => {
  const data =
    value.length > 0
      ? await getSearchedPeopleData(value, signal)
      : await getWholePeopleData(signal);
  return data;
};

export { getWholePeopleData, getSearchedPeopleData, getPlanetData, getData };
