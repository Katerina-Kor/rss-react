import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

const Cover: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div
      className={`cover ${searchParams.has('details') ? 'cover_visible' : ''}`}
      onClick={() => {
        setSearchParams((prev) => {
          const newParams = Object.fromEntries(prev.entries());
          delete newParams.details;
          return newParams;
        });
      }}
    ></div>
  );
};

export default Cover;
