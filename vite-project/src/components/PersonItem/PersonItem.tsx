import { FC } from 'react';
import { PersonResponse } from '../../types/apiResponseTypes';
import './personItem.css';
import BoldText from '../BoldText/BoldText';

type PersonItemProps = {
  personData: PersonResponse;
};

const PersonItem: FC<PersonItemProps> = ({ personData }) => {
  return (
    <div className="item_person">
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
