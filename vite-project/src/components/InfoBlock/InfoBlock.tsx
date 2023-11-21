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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
