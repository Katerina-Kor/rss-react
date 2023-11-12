import { useSearchParams } from 'react-router-dom';
import BoldText from '../BoldText/BoldText';
import { useEffect, useState } from 'react';
import { getDetailedPersonData } from '../../api/apiRequests';
import { PersonResponse } from '../../types/apiResponseTypes';
import './detailedPersonItem.css';
import Loader from '../Loader/Loader';
import ErrorUI from '../ErrorUI/ErrorUI';

const DetailedPersonItem = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [personData, setPersonData] = useState<PersonResponse>({
    birth: 'NaN',
    death: 'NaN',
    gender: 'NaN',
    hair: 'NaN',
    height: 'NaN',
    name: 'NaN',
    race: 'NaN',
    realm: 'NaN',
    spouse: 'NaN',
    wikiUrl: 'NaN',
    _id: 'NaN',
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchParams.has('details')) return;
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getDetailedPersonData(
          searchParams.get('details') || '',
          controller.signal
        );
        setPersonData(data.docs[0]);
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
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [searchParams]);

  if (error) {
    return <ErrorUI errorMessage={error} />;
  }
  return (
    <div
      style={{ display: searchParams.has('details') ? 'block' : 'none' }}
      className="person_details"
      data-testid="detailed_card"
    >
      {!isLoading ? (
        <>
          <div
            className="close"
            onClick={() => {
              setSearchParams((prev) => {
                const newParams = Object.fromEntries(prev.entries());
                delete newParams.details;
                return newParams;
              });
            }}
          >
            ⨉
          </div>
          <p>
            {<BoldText text="Name:" />}{' '}
            {personData.name === '' || personData.name === 'NaN'
              ? 'Unknown'
              : personData.name}
          </p>
          <p>
            {<BoldText text="Race:" />}{' '}
            {personData.race === '' || personData.race === 'NaN'
              ? 'Unknown'
              : personData.race}
          </p>
          <p>
            {<BoldText text="Gender:" />}{' '}
            {personData.gender === '' || personData.gender === 'NaN'
              ? 'Unknown'
              : personData.gender}
          </p>
          <p>
            {<BoldText text="Birth:" />}{' '}
            {personData.birth === '' || personData.birth === 'NaN'
              ? 'Unknown'
              : personData.birth}
          </p>
          <p>
            {<BoldText text="Death:" />}{' '}
            {personData.death === '' || personData.death === 'NaN'
              ? 'Unknown'
              : personData.death}
          </p>
          <p>
            {<BoldText text="Hair:" />}{' '}
            {personData.hair === '' || personData.hair === 'NaN'
              ? 'Unknown'
              : personData.hair}
          </p>
          <p>
            {<BoldText text="Height:" />}{' '}
            {personData.height === '' || personData.height === 'NaN'
              ? 'Unknown'
              : personData.height}
          </p>
          <p>
            {<BoldText text="Spouse:" />}{' '}
            {personData.spouse === '' || personData.spouse === 'NaN'
              ? 'Unknown'
              : personData.spouse}
          </p>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default DetailedPersonItem;
