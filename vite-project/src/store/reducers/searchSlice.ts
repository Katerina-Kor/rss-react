import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import searchStringStorage from '../../helpers/CustomStorage';

type SearchState = {
  searchValue: string;
};
const initialState: SearchState = {
  searchValue: window.location.search.includes('name')
    ? window.location.search.slice(1).split('&')[1].slice(5)
    : searchStringStorage.getValue() || '',
};

export const searchSlice = createSlice({
  name: 'searchValue',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export default searchSlice.reducer;
export type { SearchState };
