import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from './reducers/searchSlice';
import itemsReducer from './reducers/itemsNumberSlice';
import { cardsAPI } from '../services/cardsService';
import { detailedCardAPI } from '../services/detailedCardService';

const rootReducer = combineReducers({
  search: searchReducer,
  items: itemsReducer,
  [cardsAPI.reducerPath]: cardsAPI.reducer,
  [detailedCardAPI.reducerPath]: detailedCardAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return [
        ...getDefaultMiddleware(),
        cardsAPI.middleware,
        detailedCardAPI.middleware,
      ];
    },
  });
};

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => {
//     return [
//       ...getDefaultMiddleware(),
//       cardsAPI.middleware,
//       detailedCardAPI.middleware,
//     ];
//   },
// });

export type RootState = ReturnType<typeof rootReducer>;
