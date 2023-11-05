import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  FormEvent,
  FormEventHandler,
  useState,
} from 'react';
import './searchForm.css';
import searchStringStorage from '../../../helpers/CustomStorage';
import { useSearchParams } from 'react-router-dom';

type SearchFormProps = {
  isLoading: boolean;
};

const SearchForm: FC<SearchFormProps> = ({ isLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<string>(
    searchParams.get('name') || searchStringStorage.getValue() || ''
  );

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
    searchStringStorage.setValue(value);
    setSearchParams((prevParams) => {
      const newParams = Object.fromEntries(prevParams.entries());
      newParams.name = value;
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
