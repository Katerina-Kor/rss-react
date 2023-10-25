import { Component } from 'react';
import './App.css';
import Section from './Section/Section';
import SearchForm from './Forms/SearchForm/SearchForm';
import { PersonResponse } from '../types/apiResponseTypes';
import PersonItem from './PersonItem/PersonItem';
import Heading from './Heading/Heading';

type AppProps = Record<string, never>;
type AppState = {
  personsData: PersonResponse[];
};

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = { personsData: [] };
  }

  changePersonsData = (newData: PersonResponse[]) => {
    this.setState({ personsData: newData });
  };

  render(): JSX.Element {
    return (
      <main>
        <Heading level={2} title="Person" />
        <Section>
          <SearchForm setData={this.changePersonsData} />
        </Section>
        <Section>
          {this.state.personsData.map((person) => (
            <PersonItem personData={person} key={person.name} />
          ))}
        </Section>
      </main>
    );
  }
}

export default App;
