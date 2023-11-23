import { FC } from 'react';
import { useLocation } from 'react-router-dom';

const LocationDisplay: FC = () => {
  const location = useLocation();

  return <div data-testid="search-params-display">{location.search}</div>;
};

export default LocationDisplay;
