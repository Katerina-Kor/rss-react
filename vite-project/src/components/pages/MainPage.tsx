import { FC } from 'react';
import Heading from '../Heading/Heading';
import { headingLevel } from '../../types/headingTypes';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import SearchForm from '../Forms/SearchForm/SearchForm';
import ErrorButton from '../ErrorButton/ErrorButton';
import InfoBlock from '../InfoBlock/InfoBlock';

const MainPage: FC = () => {
  return (
    <main className="main">
      <Heading
        level={headingLevel.ONE}
        title="find 'the Lord of rings' hero"
        className="heading_main"
      />
      <ErrorBoundary>
        <SearchForm />
        <ErrorButton />
        <InfoBlock />
      </ErrorBoundary>
    </main>
  );
};

export default MainPage;
