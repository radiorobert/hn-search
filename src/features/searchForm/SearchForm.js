import React, { useState } from 'react';
import { connect } from 'react-redux';
import { handleSubmitSearch } from './searchSlice';


const SearchForm = ({ handleSubmitSearch }) => {
  const [searchValue, updateSearchValue] = useState('');  // hook for search field, redux for submitForm

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          handleSubmitSearch(searchValue.replace(/(<([^>]+)>)/gi, ""))
        }}
      >
        <input
          name="searchString"
          value={ searchValue }
          aria-label="Search Field"
          onChange={ e => updateSearchValue(e.target.value) }
        />
        <button
          type="submit"
        >
          GO!
        </button>
      </form>

    </div>
  );
};

const mapDispatchToProps = { handleSubmitSearch };

export default connect(null, mapDispatchToProps)(SearchForm);
