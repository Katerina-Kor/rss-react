import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { RootState } from '../../store/store';
import { itemsNumberSlice } from '../../store/reducers/itemsNumberSlice';

const ItemsPerPageSelect: FC = () => {
  const [, setSearchParams] = useSearchParams();
  const itemsPerPage = useSelector(
    (state: RootState) => state.items.itemsPerPage
  );
  const { setItemsNumber } = itemsNumberSlice.actions;
  const dispatch = useDispatch();

  return (
    <div className="wrapper__select-items-count">
      <p>Items per page:</p>
      <select
        value={itemsPerPage}
        onChange={(e) => {
          dispatch(setItemsNumber(e.target.value));
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
