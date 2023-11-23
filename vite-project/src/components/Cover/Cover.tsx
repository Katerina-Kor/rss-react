import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

const Cover: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlerClick = () => {
    setSearchParams((prev) => {
      const newParams = Object.fromEntries(prev.entries());
      delete newParams.details;
      return newParams;
    });
  };

  return (
    <div
      className={`cover${searchParams.has('details') ? ' cover_visible' : ''}`}
      onClick={handlerClick}
      data-testid="cover-elem"
    ></div>
  );
};

export default Cover;
