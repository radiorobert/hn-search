import React, { useState } from 'react';
import { connect } from 'react-redux';
import { submitSearch } from './searchSlice';


const SearchForm = ({ submitSearch }) => {
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
        onClick={ e => submitSearch({text: searchValue}) }
      >
        GO!
      </button>

    </div>
  );
};

const mapDispatchToProps = { submitSearch };

export default connect(null, mapDispatchToProps)(SearchForm);
