import { useSearchParams } from 'react-router-dom';
import BoldText from '../BoldText/BoldText';
import { useEffect } from 'react';
import { getDetailedPersonData } from '../../api/apiRequests';

const DetailedPersonItem = () => {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get('details'));

  useEffect(() => {
    if (!searchParams.has('details')) return;
    const fetchData = async () => {
      const data = await getDetailedPersonData(
        searchParams.get('details') || ''
      );
      console.log('DETAILED DATA', data);
    };
    fetchData();
  }, [searchParams]);

  return (
    <div
      style={{ visibility: searchParams.has('details') ? 'visible' : 'hidden' }}
      // className="item_person"
    >
      <p>
        {<BoldText text="Name:" />} {``}
      </p>
      <p>
        {<BoldText text="Race:" />}
        {` ${'Unknown'}`}
      </p>
    </div>
  );
};

export default DetailedPersonItem;
