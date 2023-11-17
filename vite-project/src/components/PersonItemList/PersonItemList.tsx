import { FC, useContext } from 'react';
import { PersonDataContext } from '../../context/DataContext';
import PersonItem from '../PersonItem/PersonItem';

const PersonItemList: FC = () => {
  const personData = useContext(PersonDataContext);
  return (
    <>
      {personData.map((person) => (
        <PersonItem personData={person} key={person._id} />
      ))}
    </>
  );
};

export default PersonItemList;
