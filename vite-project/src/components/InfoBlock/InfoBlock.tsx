import { Outlet, useSearchParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import PersonItem from '../PersonItem/PersonItem';
import { FC, useCallback, useEffect, useState } from 'react';
import { PersonResponse } from '../../types/apiResponseTypes';
import { getPeopleData } from '../../api/apiRequests';
import searchStringStorage from '../../helpers/CustomStorage';
import './infoBlock.css';
import ErrorUI from '../ErrorUI/ErrorUI';

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
  const [personData, setPersonData] = useState<PersonResponse[]>([]);
  const [pagesNumber, setPagesNumber] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [itemsPerPage, setItemsPerPage] = useState<string>('30');
  const fetchData = useCallback(
    async (signal: AbortSignal) => {
      try {
        setIsLoading(true);
        const data = await getPeopleData(
          searchParams.get('page') || '1',
          searchParams.get('name'),
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
        setPersonData(data.docs);
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
    [itemsPerPage, searchParams, setIsLoading, setError, setSearchParams]
  );

  useEffect(() => {
    const searchKeys = [...searchParams.keys()];
    if (searchKeys.length === 0) {
      setSearchParams({
        page: '1',
        name: searchStringStorage.getValue() || '',
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
                {personData.map((person) => (
                  <PersonItem personData={person} key={person._id} />
                ))}
                <Pagination pagesNumber={pagesNumber} />
                <div className="wrapper__select-items-count">
                  <p>Items per page:</p>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(e.target.value)}
                    className="select"
                  >
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </>
            ) : (
              <p>{`No such hero in 'the Lord of rings'`}</p>
            )}
          </>
        ) : (
          <Loader />
        )}
        <div
          className={`cover ${
            searchParams.has('details') ? 'cover_visible' : ''
          }`}
          onClick={() => {
            setSearchParams((prev) => {
              const newParams = Object.fromEntries(prev.entries());
              delete newParams.details;
              return newParams;
            });
          }}
        ></div>
      </div>
      <Outlet />
    </div>
  );
};

export default InfoBlock;
