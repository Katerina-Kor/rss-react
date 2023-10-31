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
        {<BoldText text="Birth year:" />}
        {` ${personData.birth_year}`}
      </p>
      <p>
        {<BoldText text="Gender:" />} {` ${personData.gender}`}
      </p>
      <p>
        {<BoldText text="Hair color:" />}
        {` ${personData.hair_color}`}
      </p>
      <p>
        {<BoldText text="Skin color:" />}
        {` ${personData.skin_color}`}
      </p>
      <p>
        {<BoldText text="Height:" />} {` ${personData.height}`}
      </p>
    </div>
  );
};

export default PersonItem;
