import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    value: '',
  },
  reducers: {
    submitSearch: (state, action) => {
      state.push( action.payload.text );
    },
  },
});

// Export your actions from the slice you've created
export const { submitSearch } = searchSlice.actions;

/*
export const searchLoaded = results => {
  return{
    type: 'searchForm/searchLoaded',
    payload: results
  };
};
export const fetchSearchResults = text => {
  const response = await client.get('');
  dispatch()
  
};
*/

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectSearchValue = state => state.search.value;

export default searchSlice.reducer;
