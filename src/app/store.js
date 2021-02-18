import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/searchForm/searchSlice';

export default configureStore({
  reducer: {
    searches: searchReducer,
  },
});
