import { Outlet, useSearchParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { getPeopleData } from '../../api/apiRequests';
import './infoBlock.css';
import ErrorUI from '../ErrorUI/ErrorUI';
import { SearchValueContext } from '../../context/SearchContext';
import {
  ChangePersonDataContext,
  PersonDataContext,
} from '../../context/DataContext';
import PersonItemList from '../PersonItemList/PersonItemList';
import ItemsPerPageSelect from '../ItemsPerPageSelect/ItemsPerPageSelect';
import Cover from '../Cover/Cover';

type InfoBlockProps = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  error: string | null;
};

const InfoBlock: FC<InfoBlockProps> = ({
  isLoading,
  setIsLoading,
  setError,
  error,
}) => {
  const searchValue = useContext(SearchValueContext);
  const personData = useContext(PersonDataContext);
  const changePersonData = useContext(ChangePersonDataContext);
  const [pagesNumber, setPagesNumber] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [itemsPerPage, setItemsPerPage] = useState<string>('30');
  const fetchData = useCallback(
    async (signal: AbortSignal) => {
      try {
        setIsLoading(true);
        const data = await getPeopleData(
          searchParams.get('page') || '1',
          searchValue,
          itemsPerPage,
          signal
        );
        if (data.page > data.pages) {
          setSearchParams((prev) => {
            const newParams = Object.fromEntries(prev.entries());
            newParams.page = '1';
            return newParams;
          });
          return;
        }
        setPagesNumber(data.pages);
        changePersonData(data.docs);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [
      itemsPerPage,
      searchParams,
      setIsLoading,
      setError,
      setSearchParams,
      changePersonData,
      searchValue,
    ]
  );

  useEffect(() => {
    const searchKeys = [...searchParams.keys()];
    if (searchKeys.length === 0) {
      setSearchParams({
        page: '1',
        name: searchValue,
      });
    }
    if (searchKeys.includes('details')) {
      const controller = new AbortController();
      fetchData(controller.signal);

      return () => {
        controller.abort();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!searchParams.has('page') || searchParams.has('details')) return;

    const controller = new AbortController();
    fetchData(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchData, searchParams]);

  if (error) {
    return <ErrorUI errorMessage={error} />;
  }
  return (
    <div className="section person-data_wrapper">
      <div className="section section_person-data">
        {!isLoading ? (
          <>
            {personData.length > 0 ? (
              <>
                <PersonItemList />
                <Pagination pagesNumber={pagesNumber} />
                <ItemsPerPageSelect
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={setItemsPerPage}
                />
              </>
            ) : (
              <p>{`No such hero in 'the Lord of rings'`}</p>
            )}
          </>
        ) : (
          <Loader />
        )}
        <Cover />
      </div>
      <Outlet />
    </div>
  );
};

export default InfoBlock;
