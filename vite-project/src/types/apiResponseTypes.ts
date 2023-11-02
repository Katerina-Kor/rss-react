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

export type { PeopleResponse, PersonResponse };
