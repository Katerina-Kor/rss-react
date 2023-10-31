import { FC } from 'react';
import './boldText.css';

type BoldTextProps = {
  text: string;
};

const BoldText: FC<BoldTextProps> = ({ text }) => {
  return <span className="bold">{text}</span>;
};

export default BoldText;
