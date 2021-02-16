import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  submitSearch,
  selectSearchValue,
} from './searchSlice';

export function SearchForm() {
  const searchStr = useSelector(selectSearchValue);
  const dispatch = useDispatch();
  const [searchValue, updateSearchValue] = useState('');  // hook for search field, redux for submitForm

  return (
    <div>
      <input
        name="searchString"
        value={ searchValue }
        aria-label="Search Field"
        onChange={ e => updateSearchValue(e.target.value) }
      />
      <button
        onClick={ e => dispatch(submitSearch(e.target.value)) }
      >
        GO!
      </button>

    </div>
  );
}
