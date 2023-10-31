import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  FormEvent,
  FormEventHandler,
  useState,
} from 'react';
import {
  getSearchedPeopleData,
  getWholePeopleData,
} from '../../../api/apiRequests';
import { PersonResponse } from '../../../types/apiResponseTypes';
import './searchForm.css';
import CustomStorage from '../../../helpers/CustomStorage';

type SearchFormProps = {
  setData: (newData: PersonResponse[]) => void;
  searchStringStorage: CustomStorage;
  changeLoading: (loadingStatus: boolean) => void;
};

const SearchForm: FC<SearchFormProps> = ({
  setData,
  searchStringStorage,
  changeLoading,
}) => {
  const [value, setValue] = useState<string>(searchStringStorage.getValue());
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  // componentDidMount = async () => {
  //   const data = await this.getData();
  //   this.props.setData(data);
  //   this.props.changeLoading(false);
  //   this.setState({ isDisabled: false });
  // };

  const inputChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newValue: string = event.target.value;
    setValue(newValue);
    searchStringStorage.setValue(newValue);
  };

  const formSubmit: FormEventHandler<HTMLFormElement> = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    changeLoading(true);
    setIsDisabled(true);

    const data = await getData();
    setData(data);
    changeLoading(false);
    setIsDisabled(false);
  };

  const getData = async () => {
    const data =
      value.length > 0
        ? await getSearchedPeopleData(value)
        : await getWholePeopleData();
    return data;
  };

  return (
    <form onSubmit={formSubmit} className="form_search">
      <input
        type="text"
        value={value}
        onChange={inputChange}
        className="form_search__input"
        disabled={isDisabled}
        autoFocus
      />
      <button
        type="submit"
        className="button button_search"
        disabled={isDisabled}
      >
        search
      </button>
    </form>
  );
};

export default SearchForm;
