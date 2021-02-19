import { createSlice } from '@reduxjs/toolkit';
const axios = require('axios');
const querystring = require('querystring');

const searchSlice = createSlice({
  name: 'searches',
  initialState: {
    history: [],
    currResults: null,
    resultMeta: null,
    pageNum: 1,
    error: '',
    queryParams: { page: 1 }
  },
  reducers: {
    submitSearch: (state, action) => {
      state.history.push( action.payload.text );
      state.queryParams.page = 1;
    },
    setQueryParam: (state, action) => {
      state.queryParams = { ...state.queryParams, ...action.payload };
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
    turnPage: (state, action) => { // has a bit more logic than setQueryParam
      state.queryParams.page += action.payload;
    },
  },
});

// Export your actions from the slice you've created
export const {
  submitSearch,
  fetchSearchSuccess,
  fetchSearchFailure,
  turnPage,
  setQueryParam,
} = searchSlice.actions;

// Wrapper for dispatch functions
export const handleSubmitSearch = searchStr => (dispatch, getState) => {
  dispatch(submitSearch({ text: searchStr }));
  dispatch(setQueryParam({query: searchStr.replace(/(<([^>]+)>)/gi, "")}));
  dispatch(fetchSearchResults);
};

/*
  Responsible for the actual fetching of data
  Builds query string from state.
*/
export const fetchSearchResults = (dispatch, getState) =>  {
  let url = "http://hn.algolia.com/api/v1/search?";
  let queryParams = getState().searches.queryParams;

  axios.get(url, { params: {...queryParams}})
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
  if(getState().searches.queryParams.page === 1 && pageTurnAmt < 0){
    return;
  } else if(getState().searches.queryParams.page === getState().searches.resultMeta.nbPages) {
    return;
  } else {
    dispatch(turnPage(pageTurnAmt));
  }

  dispatch(fetchSearchResults);
};

export default searchSlice.reducer;
