import { FC } from 'react';

type paginationProps = {
  pagesNumber: number;
  changeCurrentPage: (newCurrentPage: number) => void;
  fetchData: (page?: number, signal?: AbortSignal | null) => Promise<void>;
};

const Pagination: FC<paginationProps> = ({
  pagesNumber,
  changeCurrentPage,
  fetchData,
}) => {
  return (
    <div>
      <button className="button_prev">Prev</button>
      {Array.from({ length: pagesNumber }, (_, index) => (
        <button
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
      <button className="button_next">Next</button>
    </div>
  );
};

export default Pagination;
