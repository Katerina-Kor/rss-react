import { FC, useEffect, useState } from 'react';
import { PersonResponse } from '../../types/apiResponseTypes';
import searchStringStorage from '../../helpers/CustomStorage';
import Heading from '../Heading/Heading';
import { headingLevel } from '../../types/headingTypes';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Section from '../Section/Section';
import SearchForm from '../Forms/SearchForm/SearchForm';
import ErrorButton from '../ErrorButton/ErrorButton';
import Loader from '../Loader/Loader';
import PersonItem from '../PersonItem/PersonItem';
import Pagination from '../Pagination/Pagination';
import { getPeopleData } from '../../api/apiRequests';
import { Outlet, useSearchParams } from 'react-router-dom';

const MainPage: FC = () => {
  const [personData, setPersonData] = useState<PersonResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagesNumber, setPagesNumber] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams({
    page: `${currentPage}`,
  });

  useEffect(() => {
    console.log(searchParams);
    const controller = new AbortController();
    fetchData(currentPage, controller.signal);

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async (
    page: number = currentPage,
    signal: AbortSignal | null = null
  ) => {
    try {
      setSearchParams({ page: `${page}` });
      setIsLoading(true);
      const data = await getPeopleData(
        page,
        searchStringStorage.getValue(),
        30,
        signal
      );
      setPagesNumber(data.pages);
      setPersonData(data.docs);
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetPages = () => {
    setCurrentPage(1);
    setPagesNumber(0);
  };

  return (
    <main className="main">
      <Heading
        level={headingLevel.ONE}
        title="find 'the Lord of rings' hero"
        className="heading_main"
      />
      <ErrorBoundary>
        <Section className="section section_search">
          <SearchForm
            isLoading={isLoading}
            resetPages={resetPages}
            fetchData={fetchData}
          />
          <ErrorButton />
        </Section>
        <Section className="section section_person-data">
          {!isLoading ? (
            <>
              {personData.length > 0 ? (
                personData.map((person) => (
                  <PersonItem personData={person} key={person.name} />
                ))
              ) : (
                <p>{`No such hero in 'the Lord of rings'`}</p>
              )}
              <Pagination
                pagesNumber={pagesNumber}
                changeCurrentPage={setCurrentPage}
                fetchData={fetchData}
                currentPage={currentPage}
              />
            </>
          ) : (
            <Loader />
          )}
          <Outlet />
        </Section>
      </ErrorBoundary>
    </main>
  );
};

export default MainPage;
