import {
  PeopleResponse,
  PersonResponse,
  PlanetResponse,
} from '../types/apiResponseTypes';

const basePeopleURL: string = 'https://swapi.dev/api/people';
const basePlanetURL: string = 'https://swapi.dev/api/planets';

const getPeopleData = async (url: string = basePeopleURL) => {
  const request: Response = await fetch(url);
  const dataResponse: Promise<PeopleResponse> = await request.json();

  return dataResponse;
};

const getSearchedPeopleData = async (searchString: string) => {
  const url: string = `${basePeopleURL}/?search=${searchString}`;

  return (await getPeopleData(url)).results;
};

const getWholePeopleData = async () => {
  let currentPage: number = 1;
  let currentUrl: string = `${basePeopleURL}/?page=${currentPage}`;

  let responseData: PeopleResponse = await getPeopleData(currentUrl);
  const data: PersonResponse[] = responseData.results;

  while (responseData.next) {
    currentPage++;
    currentUrl = `${basePeopleURL}/?page=${currentPage}`;
    responseData = await getPeopleData(currentUrl);
    data.push(...responseData.results);
  }

  return data;
};

const getPlanetData = async (url: string = basePlanetURL) => {
  const request: Response = await fetch(url);
  const dataResponse: Promise<PlanetResponse> = await request.json();

  return dataResponse;
};

export { getWholePeopleData, getSearchedPeopleData, getPlanetData };
