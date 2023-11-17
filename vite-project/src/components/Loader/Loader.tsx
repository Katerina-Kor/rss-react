import { FC } from 'react';
import './loader.css';

const Loader: FC = () => {
  return (
    <div className="wrapper_loader" data-testid="loader">
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
