import { Outlet, useSearchParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import PersonItem from '../PersonItem/PersonItem';
import { FC, useEffect, useState } from 'react';
import { PersonResponse } from '../../types/apiResponseTypes';
import { getPeopleData } from '../../api/apiRequests';
import searchStringStorage from '../../helpers/CustomStorage';
import './infoBlock.css';

type InfoBlockProps = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const InfoBlock: FC<InfoBlockProps> = ({ isLoading, setIsLoading }) => {
  const [personData, setPersonData] = useState<PersonResponse[]>([]);
  const [pagesNumber, setPagesNumber] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchKeys = [...searchParams.keys()];
    if (searchKeys.length === 0) {
      setSearchParams({
        page: '1',
        name: searchStringStorage.getValue() || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!searchParams.has('page') || searchParams.has('details')) return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getPeopleData(
          searchParams.get('page') || '1',
          searchParams.get('name'),
          30,
          controller.signal
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
    fetchData();

    return () => {
      controller.abort();
    };
  }, [searchParams, setIsLoading]);

  return (
    <div className="section person-data_wrapper">
      <div className="section section_person-data">
        {!isLoading ? (
          <>
            {personData.length > 0 ? (
              personData.map((person) => (
                <PersonItem personData={person} key={person._id} />
              ))
            ) : (
              <p>{`No such hero in 'the Lord of rings'`}</p>
            )}
            <Pagination pagesNumber={pagesNumber} />
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
