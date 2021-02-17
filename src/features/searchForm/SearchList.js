import React, { useState } from 'react';
import { connect} from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSearchValues,
} from './searchSlice';

const mapStateToProps = state => {
  return {
    prevSearches: state.searches.history
  };
};

const SearchList = ({ prevSearches }) => {

  return (
    <div>
      <h3>Previous Searches</h3>
      <ul>
        {prevSearches.map((text, id) => (
          <p key={ id }>
            {id}. {text}
          </p>
        ))}
      </ul>
    </div>
  );
};


export default connect(mapStateToProps)(SearchList);
