import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

type ItemsPerPageProps = {
  itemsPerPage: string;
  setItemsPerPage: React.Dispatch<React.SetStateAction<string>>;
};

const ItemsPerPageSelect: FC<ItemsPerPageProps> = ({
  itemsPerPage,
  setItemsPerPage,
}) => {
  const [, setSearchParams] = useSearchParams();

  return (
    <div className="wrapper__select-items-count">
      <p>Items per page:</p>
      <select
        value={itemsPerPage}
        onChange={(e) => {
          setItemsPerPage(e.target.value);
          setSearchParams((prev) => {
            const newParams = Object.fromEntries(prev.entries());
            newParams.page = '1';
            return newParams;
          });
        }}
        className="select"
      >
        <option value={30}>30</option>
        <option value={40}>40</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
};
export default ItemsPerPageSelect;
