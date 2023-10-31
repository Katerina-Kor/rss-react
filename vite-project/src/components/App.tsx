import { FC, useState } from 'react';
import Section from './Section/Section';
import SearchForm from './Forms/SearchForm/SearchForm';
import { PersonResponse } from '../types/apiResponseTypes';
import PersonItem from './PersonItem/PersonItem';
import Heading from './Heading/Heading';
import { headingLevel } from '../types/headingTypes';
import CustomStorage from '../helpers/CustomStorage';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import ErrorButton from './ErrorButton/ErrorButton';
import Loader from './Loader/Loader';

const App: FC = () => {
  const [personData, setPersonData] = useState<PersonResponse[]>([]);
  const [searchStringStorage] = useState<CustomStorage>(
    new CustomStorage('savedSearchText')
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const changePersonsData = (newData: PersonResponse[]) => {
    setPersonData(newData);
  };

  const changeLoadingStatus = (loadingStatus: boolean) => {
    setIsLoading(loadingStatus);
  };

  return (
    <main className="main">
      <Heading
        level={headingLevel.ONE}
        title="find 'star wars' hero"
        className="heading_main"
      />
      <ErrorBoundary>
        <Section className="section section_search">
          <SearchForm
            setData={changePersonsData}
            searchStringStorage={searchStringStorage}
            changeLoading={changeLoadingStatus}
          />
          <ErrorButton />
        </Section>
        <Section className="section section_person-data">
          {isLoading ? (
            <Loader />
          ) : personData.length > 0 ? (
            personData.map((person) => (
              <PersonItem personData={person} key={person.name} />
            ))
          ) : (
            <p>{`No such hero in 'Star Wars'`}</p>
          )}
        </Section>
      </ErrorBoundary>
    </main>
  );
};

export default App;
