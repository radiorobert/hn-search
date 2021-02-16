import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import searchReducer from '../features/searchForm/searchSlice';

export default configureStore({
  reducer: {
    searches: searchReducer,
  },
});
