import { FC } from 'react';
import PersonItem from '../PersonItem/PersonItem';
import { PersonResponse } from '../../types/apiResponseTypes';

const PersonItemList: FC<{ data: PersonResponse[] }> = ({ data }) => {
  return (
    <>
      {data.map((person) => (
        <PersonItem personData={person} key={person._id} />
      ))}
    </>
  );
};

export default PersonItemList;
