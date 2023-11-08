import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  FormEvent,
  FormEventHandler,
  useContext,
  useState,
} from 'react';
import './searchForm.css';
import searchStringStorage from '../../../helpers/CustomStorage';
import { useSearchParams } from 'react-router-dom';
import {
  ChangeSearchValueContext,
  SearchValueContext,
} from '../../../context/SearchContext';

type SearchFormProps = {
  isLoading: boolean;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const SearchForm: FC<SearchFormProps> = ({ isLoading, setError }) => {
  const searchValue = useContext(SearchValueContext);
  const changeSearchValue = useContext(ChangeSearchValueContext);
  const [value, setValue] = useState<string>(searchValue);
  const [, setSearchParams] = useSearchParams();

  const inputChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newValue: string = event.target.value;
    setValue(newValue);
  };

  const formSubmit: FormEventHandler<HTMLFormElement> = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    searchStringStorage.setValue(searchValue);
    changeSearchValue(value);
    setError(null);
    setSearchParams((prevParams) => {
      const newParams = Object.fromEntries(prevParams.entries());
      newParams.name = searchValue;
      newParams.page = '1';
      return newParams;
    });
  };

  return (
    <div className="section section_search">
      <form onSubmit={formSubmit} className="form_search">
        <input
          type="text"
          value={value}
          onChange={inputChange}
          className="form_search__input"
          disabled={isLoading}
          autoFocus
        />
        <button
          type="submit"
          className="button button_search"
          disabled={isLoading}
        >
          search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
