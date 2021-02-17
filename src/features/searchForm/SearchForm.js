import React, { useState } from 'react';
import { connect } from 'react-redux';
import { fetchSearchResults } from './searchSlice';


const SearchForm = ({ fetchSearchResults }) => {
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
        onClick={ e => fetchSearchResults(searchValue) }
      >
        GO!
      </button>

    </div>
  );
};

const mapDispatchToProps = { fetchSearchResults };

export default connect(null, mapDispatchToProps)(SearchForm);
