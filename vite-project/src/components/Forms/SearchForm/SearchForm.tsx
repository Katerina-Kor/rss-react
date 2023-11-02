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

type SearchFormProps = {
  isLoading: boolean;
  resetPages: () => void;
  fetchData: (page?: number, signal?: AbortSignal | null) => Promise<void>;
};

const SearchForm: FC<SearchFormProps> = ({
  isLoading,
  resetPages,
  fetchData,
}) => {
  const [value, setValue] = useState<string>(
    searchStringStorage.getValue() || ''
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
    resetPages();
    fetchData(1);
  };

  return (
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
  );
};

export default SearchForm;
