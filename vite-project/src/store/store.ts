import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from './reducers/searchSlice';
import itemsReducer from './reducers/itemsNumberSlice';
import { cardsAPI } from '../services/cardsService';

const rootReducer = combineReducers({
  search: searchReducer,
  items: itemsReducer,
  [cardsAPI.reducerPath]: cardsAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return [...getDefaultMiddleware(), cardsAPI.middleware];
  },
});

export type RootState = ReturnType<typeof rootReducer>;

// const setupStore = () => {
//   return configureStore({
//     reducer: rootReducer
//   })
// }

// type AppDicp = typeof store['dispatch']
