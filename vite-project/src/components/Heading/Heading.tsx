import { FC } from 'react';
import { headingLevel } from '../../types/headingTypes';
import './heading.css';

type HeadingProps = {
  level: headingLevel;
  title: string;
  className?: string;
};

const Heading: FC<HeadingProps> = ({ level, title, className }) => {
  const fullClassName = className
    ? `heading heading_${level} ${className}`
    : `heading heading_${level}`;

  switch (level) {
    case 1:
      return <h1 className={fullClassName}>{title}</h1>;
    case 2:
      return <h2 className={fullClassName}>{title}</h2>;
    case 3:
      return <h3 className={fullClassName}>{title}</h3>;
    case 4:
      return <h4 className={fullClassName}>{title}</h4>;
    case 5:
      return <h5 className={fullClassName}>{title}</h5>;
    case 6:
      return <h6 className={fullClassName}>{title}</h6>;
  }
};

export default Heading;
