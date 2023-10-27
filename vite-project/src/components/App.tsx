import { Component } from 'react';
import Section from './Section/Section';
import SearchForm from './Forms/SearchForm/SearchForm';
import { PersonResponse } from '../types/apiResponseTypes';
import PersonItem from './PersonItem/PersonItem';
import Heading from './Heading/Heading';
import { headingLevel } from '../types/headingTypes';
import CustomStorage from '../helpers/CustomStorage';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import ErrorButton from './ErrorButton/ErrorButton';
import ErrorComponent from './ErrorComponent/ErrorComponent';
import Loader from './Loader/Loader';

type AppProps = Record<string, never>;
type AppState = {
  personsData: PersonResponse[];
  searchStringStorage: CustomStorage;
  isLoading: boolean;
};

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      personsData: [],
      searchStringStorage: new CustomStorage('savedSearchText'),
      isLoading: true,
    };
  }

  // componentDidUpdate(prevProps: AppProps, prevState: AppState): void {
  //   if (this.state.personData.homeworld !== prevProps.personData.homeworld) {
  //     this.setHomePlanetName();
  //   }
  // }

  changePersonsData = (newData: PersonResponse[]) => {
    this.setState({ personsData: newData });
  };

  changeLoadingStatus = (loadingStatus: boolean) => {
    this.setState({ isLoading: loadingStatus });
  };

  render(): JSX.Element {
    return (
      <main className="main">
        <Heading
          level={headingLevel.ONE}
          title="find 'star wars' hero"
          className="heading_main"
        />
        <ErrorBoundary fallback={<ErrorComponent />}>
          <Section className="section section_search">
            <SearchForm
              setData={this.changePersonsData}
              searchStringStorage={this.state.searchStringStorage}
              changeLoading={this.changeLoadingStatus}
            />
            <ErrorButton />
          </Section>
          <Section className="section section_person-data">
            {this.state.isLoading ? (
              <Loader />
            ) : this.state.personsData.length > 0 ? (
              this.state.personsData.map((person) => (
                <PersonItem personData={person} key={person.name} />
              ))
            ) : (
              <p>{`No such hero in 'Star Wars'`}</p>
            )}
          </Section>
        </ErrorBoundary>
      </main>
    );
  }
}

export default App;
