import { createSlice } from '@reduxjs/toolkit';
const axios = require('axios');

const searchSlice = createSlice({
  name: 'searches',
  initialState: {
    history: [],
    currResults: null,
    error: '',
  },
  reducers: {
    submitSearch: (state, action) => {
      state.history.push( action.payload.text );
    },
    fetchSearchSuccess: (state, action) => {
      state.currResults = action.payload.body;
    },
    fetchSearchFailure: (state, action) => {
      state.currResults = null;
      state.error = "ERROR: the search failed.";
    },
  },
});

// Export your actions from the slice you've created
export const {
  submitSearch,
  fetchSearchSuccess,
  fetchSearchFailure,
} = searchSlice.actions;

// consider a default to the last thing in the search menu, but otherwise index for clicked
// this was helpful
// https://stackoverflow.com/questions/49155438/react-redux-is-adding-async-method-in-a-reducer-an-anti-pattern
export const fetchSearchResults = searchStr => (dispatch, getState) =>  {
  // Ensure we capture previous searches.
  dispatch(submitSearch({ text: searchStr }));

  // Opting for promises instead of await
  axios.get(`http://hn.algolia.com/api/v1/search?query=${searchStr}`)
    .then(res => {
      dispatch(fetchSearchSuccess({body: res.data.hits}));
    })
    .catch(err => {
      dispatch(fetchSearchFailure(console.log(err)));
    });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectSearchValues = state => state.searches;

export default searchSlice.reducer;
