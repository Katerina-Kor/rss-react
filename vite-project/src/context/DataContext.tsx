import { FC, createContext, useCallback, useState } from 'react';
import { PersonResponse } from '../types/apiResponseTypes';

type PersonDataProviderProps = {
  children: React.ReactNode;
};

export const PersonDataContext = createContext<PersonResponse[]>([]);
export const ChangePersonDataContext = createContext<
  (newData: PersonResponse[]) => void
>(() => {});

const PersonDataProvider: FC<PersonDataProviderProps> = ({ children }) => {
  const [personData, setPersonData] = useState<PersonResponse[]>([]);

  // const changePersonData = (newData: PersonResponse[]) => {
  //   setPersonData(newData);
  // }

  const changePersonData = useCallback((newData: PersonResponse[]) => {
    setPersonData(newData);
  }, []);

  return (
    <PersonDataContext.Provider value={personData}>
      <ChangePersonDataContext.Provider value={changePersonData}>
        {children}
      </ChangePersonDataContext.Provider>
    </PersonDataContext.Provider>
  );
};

export default PersonDataProvider;
