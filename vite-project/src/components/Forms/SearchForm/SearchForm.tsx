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
import { searchSlice } from '../../../store/reducers/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const SearchForm: FC = () => {
  const { setSearchValue } = searchSlice.actions;
  const searchValue = useSelector(
    (state: RootState) => state.search.searchValue
  );
  const dispatch = useDispatch();
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
    searchStringStorage.setValue(value);
    dispatch(setSearchValue(value));
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
          data-testid="input"
          type="text"
          value={value}
          onChange={inputChange}
          className="form_search__input"
          autoFocus
        />
        <button type="submit" className="button button_search">
          search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
