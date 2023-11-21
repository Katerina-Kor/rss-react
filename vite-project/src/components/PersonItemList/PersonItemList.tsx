import { FC } from 'react';
import PersonItem from '../PersonItem/PersonItem';
import { PersonResponse } from '../../types/apiResponseTypes';

type PersonItemListProps = {
  data: PersonResponse[];
};
const PersonItemList: FC<PersonItemListProps> = ({ data }) => {
  return (
    <>
      {data.map((person) => (
        <PersonItem personData={person} key={person._id} />
      ))}
    </>
  );
};

export default PersonItemList;
