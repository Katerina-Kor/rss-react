import { FC } from 'react';
import { PersonResponse } from '../../types/apiResponseTypes';
import './personItem.css';
import BoldText from '../BoldText/BoldText';
import { useSearchParams } from 'react-router-dom';

type PersonItemProps = {
  personData: PersonResponse;
};

const PersonItem: FC<PersonItemProps> = ({ personData }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div
      data-testid="card_item"
      className="item_person"
      onClick={() => {
        if (searchParams.has('details')) return;
        setSearchParams((prev) => {
          const newParams = Object.fromEntries(prev.entries());
          newParams.details = personData._id;
          return newParams;
        });
      }}
    >
      <p data-testid="card_name">
        {<BoldText text="Name:" />} {` ${personData.name}`}
      </p>
      <p data-testid="card_race">
        {<BoldText text="Race:" />}
        {` ${personData.race || 'Unknown'}`}
      </p>
    </div>
  );
};

export default PersonItem;
