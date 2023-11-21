import { useSearchParams } from 'react-router-dom';
import BoldText from '../BoldText/BoldText';
import './detailedPersonItem.css';
import Loader from '../Loader/Loader';
import ErrorUI from '../ErrorUI/ErrorUI';
import { detailedCardAPI } from '../../services/detailedCardService';

const DetailedPersonItem = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isError, isSuccess, isFetching } =
    detailedCardAPI.useFetchDetailedCardQuery(
      searchParams.get('details') || '',
      { skip: !searchParams.has('details') }
    );

  if (isError) {
    return <ErrorUI errorMessage={'error'} />;
  }
  return (
    <div
      style={{ display: searchParams.has('details') ? 'block' : 'none' }}
      className="person_details"
      data-testid="detailed_card"
    >
      {!isFetching ? (
        <>
          {isSuccess && data.docs.length > 0 && (
            <>
              <div
                className="close"
                data-testid="close_button"
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
              <p data-testid="detailed_card_name">
                {<BoldText text="Name:" />}{' '}
                {data.docs[0].name === '' || data.docs[0].name === 'NaN'
                  ? 'Unknown'
                  : data.docs[0].name}
              </p>
              <p>
                {<BoldText text="Race:" />}{' '}
                {data.docs[0].race === '' || data.docs[0].race === 'NaN'
                  ? 'Unknown'
                  : data.docs[0].race}
              </p>
              <p>
                {<BoldText text="Gender:" />}{' '}
                {data.docs[0].gender === '' || data.docs[0].gender === 'NaN'
                  ? 'Unknown'
                  : data.docs[0].gender}
              </p>
              <p>
                {<BoldText text="Birth:" />}{' '}
                {data.docs[0].birth === '' || data.docs[0].birth === 'NaN'
                  ? 'Unknown'
                  : data.docs[0].birth}
              </p>
              <p>
                {<BoldText text="Death:" />}{' '}
                {data.docs[0].death === '' || data.docs[0].death === 'NaN'
                  ? 'Unknown'
                  : data.docs[0].death}
              </p>
              <p>
                {<BoldText text="Hair:" />}{' '}
                {data.docs[0].hair === '' || data.docs[0].hair === 'NaN'
                  ? 'Unknown'
                  : data.docs[0].hair}
              </p>
              <p>
                {<BoldText text="Height:" />}{' '}
                {data.docs[0].height === '' || data.docs[0].height === 'NaN'
                  ? 'Unknown'
                  : data.docs[0].height}
              </p>
              <p>
                {<BoldText text="Spouse:" />}{' '}
                {data.docs[0].spouse === '' || data.docs[0].spouse === 'NaN'
                  ? 'Unknown'
                  : data.docs[0].spouse}
              </p>
            </>
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default DetailedPersonItem;
