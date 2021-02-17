import React, { useState } from 'react';
import { connect } from 'react-redux';
import { fetchSearchResults } from './searchSlice';


const SearchForm = ({ fetchSearchResults }) => {
  const [searchValue, updateSearchValue] = useState('');  // hook for search field, redux for submitForm

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          fetchSearchResults(searchValue.replace(/(<([^>]+)>)/gi, ""))
        }}
      >
        <input
          name="searchString"
          value={ searchValue }
          aria-label="Search Field"
          onChange={ e => updateSearchValue(e.target.value) }
        />
        <button
          //onClick={ e => fetchSearchResults(searchValue) }
          type="submit"
        >
          GO!
        </button>
      </form>

    </div>
  );
};

const mapDispatchToProps = { fetchSearchResults };

export default connect(null, mapDispatchToProps)(SearchForm);
