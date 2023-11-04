import { FC } from 'react';
import { PersonResponse } from '../../types/apiResponseTypes';
import './personItem.css';
import BoldText from '../BoldText/BoldText';
import { useSearchParams } from 'react-router-dom';

type PersonItemProps = {
  personData: PersonResponse;
};

const PersonItem: FC<PersonItemProps> = ({ personData }) => {
  // const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  return (
    <div
      className="item_person"
      onClick={() => {
        setSearchParams((prev) => {
          const newParams = Object.fromEntries(prev.entries());
          newParams.details = 'a';
          return newParams;
        });
        // navigate('/');
      }}
    >
      <p>
        {<BoldText text="Name:" />} {` ${personData.name}`}
      </p>
      <p>
        {<BoldText text="Race:" />}
        {` ${personData.race || 'Unknown'}`}
      </p>
    </div>
  );
};

export default PersonItem;
