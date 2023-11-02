import { FC } from 'react';
import './pagination.css';

type paginationProps = {
  pagesNumber: number;
  changeCurrentPage: (newCurrentPage: number) => void;
  fetchData: (page?: number, signal?: AbortSignal | null) => Promise<void>;
  currentPage: number;
};

const Pagination: FC<paginationProps> = ({
  pagesNumber,
  changeCurrentPage,
  fetchData,
  currentPage,
}) => {
  return (
    <div className="pagination">
      <button className="button button_prev">Prev</button>
      {Array.from({ length: pagesNumber }, (_, index) => (
        <button
          className={`button ${
            currentPage === index + 1 ? 'button_current' : ''
          }`}
          id={`${index + 1}`}
          key={index + 1}
          onClick={() => {
            changeCurrentPage(index + 1);
            fetchData(index + 1);
          }}
        >
          {index + 1}
        </button>
      ))}
      <button className="button button_next">Next</button>
    </div>
  );
};

export default Pagination;
