import { FC, useState } from 'react';
import Heading from '../Heading/Heading';
import { headingLevel } from '../../types/headingTypes';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import SearchForm from '../Forms/SearchForm/SearchForm';
import ErrorButton from '../ErrorButton/ErrorButton';
import InfoBlock from '../InfoBlock/InfoBlock';
import SearchValueProvider from '../../context/SearchContext';
import PersonDataProvider from '../../context/DataContext';

const MainPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="main">
      <Heading
        level={headingLevel.ONE}
        title="find 'the Lord of rings' hero"
        className="heading_main"
      />
      <ErrorBoundary>
        <SearchValueProvider>
          <SearchForm isLoading={isLoading} setError={setError} />
          <ErrorButton />
          <PersonDataProvider>
            <InfoBlock
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setError={setError}
              error={error}
            />
          </PersonDataProvider>
        </SearchValueProvider>
      </ErrorBoundary>
    </main>
  );
};

export default MainPage;
