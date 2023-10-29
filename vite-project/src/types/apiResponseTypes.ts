type PeopleResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PersonResponse[];
};

type PersonResponse = {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string;
  url: string;
  created: string;
  edited: string;
};

type PlanetResponse = {
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: string[];
  films: string[];
  url: string;
  created: string;
  edited: string;
};

export type { PeopleResponse, PersonResponse, PlanetResponse };
