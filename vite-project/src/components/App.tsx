import { Component } from 'react';
import Section from './Section/Section';
import SearchForm from './Forms/SearchForm/SearchForm';
import { PersonResponse } from '../types/apiResponseTypes';
import PersonItem from './PersonItem/PersonItem';
import Heading from './Heading/Heading';
import { headingLevel } from '../types/headingTypes';

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
      <main className="main">
        <Heading
          level={headingLevel.ONE}
          title="find 'star wars' hero"
          className="heading_main"
        />
        <Section className="section">
          <SearchForm setData={this.changePersonsData} />
        </Section>
        <Section className="section wrapper_person-data">
          {this.state.personsData.map((person) => (
            <PersonItem personData={person} key={person.name} />
          ))}
        </Section>
      </main>
    );
  }
}

export default App;
