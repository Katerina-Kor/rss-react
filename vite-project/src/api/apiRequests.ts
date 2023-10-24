import { PeopleResponse } from '../types/apiResponseTypes';

const baseURL: string = 'https://swapi.dev/api/people';

async function getData(url: string = baseURL) {
  const request: Response = await fetch(url);
  const data: Promise<PeopleResponse> = request.json();

  return data;
}

async function getSearchedData(searchString: string) {
  const url: string = `${baseURL}/?search=${searchString}`;

  return getData(url);
}

export { getData, getSearchedData };
