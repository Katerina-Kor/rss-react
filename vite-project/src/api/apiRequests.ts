import { PeopleResponse, PersonResponse } from '../types/apiResponseTypes';

const baseURL: string = 'https://swapi.dev/api/people';

const getData = async (url: string = baseURL) => {
  // const currentUrl = url ? `${url}&page=${pageNumber}` : `${baseURL}/?page=${pageNumber}`;
  const request: Response = await fetch(url);
  const dataResponse: Promise<PeopleResponse> = await request.json();

  return dataResponse;
};

const getSearchedData = async (searchString: string) => {
  const url: string = `${baseURL}/?search=${searchString}`;

  return (await getData(url)).results;
};

const getWholeData = async () => {
  let currentPage: number = 1;
  let currentUrl: string = `${baseURL}/?page=${currentPage}`;

  let responseData: PeopleResponse = await getData(currentUrl);
  const data: PersonResponse[] = responseData.results;

  while (responseData.next) {
    currentPage++;
    currentUrl = `${baseURL}/?page=${currentPage}`;
    responseData = await getData(currentUrl);
    data.push(...responseData.results);
  }

  return data;
};

export { getWholeData, getSearchedData };
