import {
  ChangeEvent,
  ChangeEventHandler,
  Component,
  FormEvent,
  FormEventHandler,
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
type SearchFormState = {
  value: string;
};

class SearchForm extends Component<SearchFormProps, SearchFormState> {
  constructor(props: SearchFormProps) {
    super(props);
    this.state = {
      value: this.props.searchStringStorage.getValue(),
    };
  }

  componentDidMount = async () => {
    const data = await this.getData();
    this.props.setData(data);
    this.props.changeLoading(false);
  };

  inputChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newValue: string = event.target.value;
    this.setState({ value: newValue });
    this.props.searchStringStorage.setValue(newValue);
  };

  formSubmit: FormEventHandler<HTMLFormElement> = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    this.props.changeLoading(true);

    const data = await this.getData();
    this.props.setData(data);
    this.props.changeLoading(false);
  };

  getData = async () => {
    const data =
      this.state.value.length > 0
        ? await getSearchedPeopleData(this.state.value)
        : await getWholePeopleData();
    return data;
  };

  render(): JSX.Element {
    return (
      <form onSubmit={this.formSubmit} className="form_search">
        <input
          type="text"
          value={this.state.value}
          onChange={this.inputChange}
          className="form_search__input"
          autoFocus
        />
        <button type="submit" className="button button_search">
          search
        </button>
      </form>
    );
  }
}

export default SearchForm;
