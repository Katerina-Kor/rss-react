import { Outlet, useSearchParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import { FC, useEffect } from 'react';
import './infoBlock.css';
import ErrorUI from '../ErrorUI/ErrorUI';
import PersonItemList from '../PersonItemList/PersonItemList';
import ItemsPerPageSelect from '../ItemsPerPageSelect/ItemsPerPageSelect';
import Cover from '../Cover/Cover';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { cardsAPI } from '../../services/cardsService';
import searchStringStorage from '../../helpers/CustomStorage';

const InfoBlock: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = useSelector(
    (state: RootState) => state.search.searchValue
  );
  const itemsPerPage = useSelector(
    (state: RootState) => state.items.itemsPerPage
  );
  // const [itemsPerPage, setItemsPerPage] = useState<string>('30');
  // const fetchData = useCallback(
  //   async (signal: AbortSignal) => {
  //     try {
  //       setIsLoading(true);
  //       const data = await getPeopleData(
  //         searchParams.get('page') || '1',
  //         searchValue,
  //         itemsPerPage,
  //         signal
  //       );
  //       if (data.page > data.pages) {
  //         setSearchParams((prev) => {
  //           const newParams = Object.fromEntries(prev.entries());
  //           newParams.page = '1';
  //           return newParams;
  //         });
  //         return;
  //       }
  //       setPagesNumber(data.pages);
  //       changePersonData(data.docs);
  //     } catch (error) {
  //       if (error instanceof Error && error.name === 'AbortError') {
  //         return;
  //       }
  //       if (error instanceof Error) {
  //         setError(error.message);
  //       }
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   },
  //   [
  //     itemsPerPage,
  //     searchParams,
  //     setIsLoading,
  //     setError,
  //     setSearchParams,
  //     changePersonData,
  //     searchValue,
  //   ]
  // );

  useEffect(() => {
    const searchKeys = [...searchParams.keys()];
    if (searchKeys.length === 0) {
      setSearchParams({
        page: '1',
        name: searchValue,
      });
    }
    const searchName = searchParams.get('name');
    if (searchName && searchName !== searchStringStorage.getValue()) {
      searchStringStorage.setValue(searchName);
    }
    // if (searchKeys.includes('details')) {
    //   const controller = new AbortController();
    //   fetchData(controller.signal);

    //   return () => {
    //     controller.abort();
    //   };
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (!searchParams.has('page') || searchParams.has('details')) return;

  //   const controller = new AbortController();
  //   fetchData(controller.signal);

  //   return () => {
  //     controller.abort();
  //   };
  // }, [fetchData, searchParams]);

  const { data, isError, isSuccess, isFetching } = cardsAPI.useFetchCardsQuery({
    limit: itemsPerPage,
    page: searchParams.get('page') || '1',
    name: searchValue,
  });

  if (isError) {
    return <ErrorUI errorMessage={'error'} />;
  }
  return (
    <div className="section person-data_wrapper">
      <div className="section section_person-data">
        {!isFetching ? (
          <>
            {isSuccess && data.docs.length > 0 ? (
              <>
                <PersonItemList data={data.docs} />
                <Pagination pagesNumber={data.pages} />
                <ItemsPerPageSelect />
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
