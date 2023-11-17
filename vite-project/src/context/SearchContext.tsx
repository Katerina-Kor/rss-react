import { FC, createContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import searchStringStorage from '../helpers/CustomStorage';

type SearchValueProviderProps = {
  children: React.ReactNode;
};

export const SearchValueContext = createContext<string>('');
export const ChangeSearchValueContext = createContext<
  (newValue: string) => void
>(() => {});

const SearchValueProvider: FC<SearchValueProviderProps> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>(
    searchParams.get('name') || searchStringStorage.getValue() || ''
  );

  const changeSearchValue = (newValue: string) => {
    setSearchValue(newValue);
  };

  return (
    <SearchValueContext.Provider value={searchValue}>
      <ChangeSearchValueContext.Provider value={changeSearchValue}>
        {children}
      </ChangeSearchValueContext.Provider>
    </SearchValueContext.Provider>
  );
};

export default SearchValueProvider;
