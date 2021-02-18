import { createSlice } from '@reduxjs/toolkit';
const axios = require('axios');

const searchSlice = createSlice({
  name: 'searches',
  initialState: {
    history: [],
    currResults: null,
    resultMeta: null,
    pageNum: 1,
    error: '',
    tags: "",
  },
  reducers: {
    submitSearch: (state, action) => {
      state.history.push( action.payload.text );
    },
    setTag: (state, action) => {
      state.tags = action.payload;
    },
    fetchSearchSuccess: (state, action) => {
      state.currResults = action.payload.body.hits;
      state.resultMeta = action.payload.body;
    },
    fetchSearchFailure: (state, action) => {
      state.currResults = null;
      state.resultMeta = null;
      state.error = "ERROR: the search failed.";
    },
    turnPage: (state, action) => {  // one function seems to reduce strange redux complexity elsewhere
      state.pageNum += action.payload;
    },
  },
});

// Export your actions from the slice you've created
export const {
  submitSearch,
  fetchSearchSuccess,
  fetchSearchFailure,
  turnPage,
  setTag,
} = searchSlice.actions;

export const handleSubmitSearch = searchStr => (dispatch, getState) => {
  dispatch(submitSearch({ text: searchStr }));
  dispatch(fetchSearchResults);
};

/*
  this was helpful
  https://stackoverflow.com/questions/49155438/react-redux-is-adding-async-method-in-a-reducer-an-anti-pattern
*/
export const fetchSearchResults = (dispatch, getState) =>  {
  let searchStr = getState().searches.history[getState().searches.history.length - 1];
  let tag = getState().searches.tags;

  let query = `http://hn.algolia.com/api/v1/search?query=${searchStr}`;


  if(tag !== "") {
    query = query.concat(`&tags=${tag}`);
  }
  query = query.concat(`&page=${getState().searches.pageNum}`);

  console.log(query)
  axios.get(query)
    .then(res => {
      dispatch(fetchSearchSuccess({body: res.data}));
    })
    .catch(err => {
      dispatch(fetchSearchFailure(console.log(err)));
    });
};

/*
 Dispatches page set, then triggers a fetchSearch

 By having a wrapper here, we can issue any amount of page turning.
 We can also conduct any logic we see fit that doesn't belong in reducers.
 */
export const changePage = pageTurnAmt => (dispatch, getState) => {
  if(getState().searches.pageNum === 1 && pageTurnAmt < 0){
    return;
  } else if(getState().searches.pageNum === getState().searches.resultMeta.nbPages) {
    return;
  } else {
    dispatch(turnPage(pageTurnAmt));
  }

  dispatch(fetchSearchResults);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectSearchValues = state => state.searches;

export default searchSlice.reducer;
