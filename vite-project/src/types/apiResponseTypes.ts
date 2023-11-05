type PeopleResponse = {
  limit: number;
  page: number;
  pages: number;
  total: number;
  docs: PersonResponse[];
};

type PersonResponse = {
  birth: string;
  death: string;
  gender: string;
  hair: string;
  height: string;
  name: string;
  race: string;
  realm: string;
  spouse: string;
  wikiUrl: string;
  _id: string;
};

type DetailedPersonResponse = {
  limit: number;
  page: number;
  pages: number;
  total: number;
  offset: number;
  docs: PersonResponse[];
};

export type { PeopleResponse, PersonResponse, DetailedPersonResponse };
