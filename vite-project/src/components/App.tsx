import { FC, useEffect, useState } from 'react';
import Section from './Section/Section';
import SearchForm from './Forms/SearchForm/SearchForm';
import { PersonResponse } from '../types/apiResponseTypes';
import PersonItem from './PersonItem/PersonItem';
import Heading from './Heading/Heading';
import { headingLevel } from '../types/headingTypes';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import ErrorButton from './ErrorButton/ErrorButton';
import Loader from './Loader/Loader';
import { getData } from '../api/apiRequests';
import searchStringStorage from '../helpers/CustomStorage';

const App: FC = () => {
  const [personData, setPersonData] = useState<PersonResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const data = await getData(
          searchStringStorage.getValue(),
          controller.signal
        );
        setPersonData(data);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          throw error;
        }
      }
    };
    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

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
            changeLoading={changeLoadingStatus}
            isLoading={isLoading}
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
