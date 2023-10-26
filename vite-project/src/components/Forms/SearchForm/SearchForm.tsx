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

type SearchFormProps = {
  setData: (newData: PersonResponse[]) => void;
};
type SearchFormState = {
  value: string;
};

class SearchForm extends Component<SearchFormProps, SearchFormState> {
  constructor(props: SearchFormProps) {
    super(props);
    this.state = { value: '' };
  }

  inputChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ value: event.target.value });
  };

  formSubmit: FormEventHandler<HTMLFormElement> = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const data =
      this.state.value.length > 0
        ? await getSearchedPeopleData(this.state.value)
        : await getWholePeopleData();
    console.log(data);
    this.props.setData(data);
  };

  render(): JSX.Element {
    return (
      <form onSubmit={this.formSubmit} className="form_search">
        <input
          type="text"
          onChange={this.inputChange}
          className="form_search__input"
          autoFocus
        />
        <button type="submit" className="button form_search__button">
          search
        </button>
      </form>
    );
  }
}

export default SearchForm;
