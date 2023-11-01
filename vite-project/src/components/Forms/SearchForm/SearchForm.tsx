import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  FormEvent,
  FormEventHandler,
  useState,
} from 'react';
import { getData } from '../../../api/apiRequests';
import { PersonResponse } from '../../../types/apiResponseTypes';
import './searchForm.css';
import searchStringStorage from '../../../helpers/CustomStorage';

type SearchFormProps = {
  setData: (newData: PersonResponse[]) => void;
  changeLoading: (loadingStatus: boolean) => void;
  isLoading: boolean;
};

const SearchForm: FC<SearchFormProps> = ({
  setData,
  changeLoading,
  isLoading,
}) => {
  const [value, setValue] = useState<string>(searchStringStorage.getValue());

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
    changeLoading(true);

    const data = await getData(value);
    setData(data);
    changeLoading(false);
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
