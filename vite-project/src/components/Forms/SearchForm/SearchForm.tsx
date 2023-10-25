import {
  ChangeEvent,
  ChangeEventHandler,
  Component,
  FormEvent,
  FormEventHandler,
} from 'react';
import { getSearchedData, getWholeData } from '../../../api/apiRequests';

type SearchFormProps = Record<string, never>;
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
        ? await getSearchedData(this.state.value)
        : await getWholeData();
    console.log(data);
  };

  render(): JSX.Element {
    return (
      <form onSubmit={this.formSubmit}>
        <input type="text" onChange={this.inputChange} />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default SearchForm;
