import { FC, useState } from 'react';
import './pagination.css';
import { useSearchParams } from 'react-router-dom';

type paginationProps = {
  pagesNumber: number;
};

const Pagination: FC<paginationProps> = ({ pagesNumber }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage] = useState<string>(searchParams.get('page') || '1');

  const changeCurrentPage = (page: string) => {
    setSearchParams((prevParams) => {
      const newParams = Object.fromEntries(prevParams.entries());
      newParams.page = page;
      return newParams;
    });
  };

  return (
    <div className="pagination" data-testid="pagination">
      <button
        className="button button_prev"
        onClick={() => {
          changeCurrentPage(`${+currentPage - 1}`);
        }}
        disabled={currentPage === '1'}
      >
        Prev
      </button>
      {Array.from({ length: pagesNumber }, (_, index) => (
        <button
          data-testid={`${index + 1}`}
          className={`button ${
            currentPage === `${index + 1}` ? 'button_current' : ''
          }`}
          id={`${index + 1}`}
          key={index + 1}
          onClick={() => {
            changeCurrentPage(`${index + 1}`);
          }}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="button button_next"
        onClick={() => {
          changeCurrentPage(`${+currentPage + 1}`);
        }}
        disabled={currentPage === `${pagesNumber}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
