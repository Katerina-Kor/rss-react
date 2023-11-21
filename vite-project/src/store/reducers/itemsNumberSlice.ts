import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ItemsNumberState = {
  itemsPerPage: string;
};

const initialState: ItemsNumberState = {
  itemsPerPage: '30',
};

export const itemsNumberSlice = createSlice({
  name: 'itemsNumber',
  initialState,
  reducers: {
    setItemsNumber(state, action: PayloadAction<string>) {
      state.itemsPerPage = action.payload;
    },
  },
});

export default itemsNumberSlice.reducer;
