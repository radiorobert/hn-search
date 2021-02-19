import React, { useState } from 'react';
import { connect } from 'react-redux';
import { handleSubmitSearch, setQueryParam } from './searchSlice';


const SearchForm = ({ handleSubmitSearch, setQueryParam }) => {
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
        <br/>
        <label>
          Search by date
          <input
            name="searchByDate"
            type="checkbox"
          />
        </label>
        &nbsp;|&nbsp;
        <label>
          Filter by tag:&nbsp;
          <select onChange={ e => setQueryParam({tags: e.target.value}) }>
            <option value={ "all" }>All</option>
            <option value={ "story" }>Stories</option>
            <option value={ "comment" }>Comments</option>
            <option value={ "ask_hn" }>Ask HN</option>
            <option value={ "show_hn" }>Show HN</option>
            <option value={ "poll" }>Polls</option>
          </select>
        </label>
      </form>

    </div>
  );
};

const mapDispatchToProps = { handleSubmitSearch, setQueryParam  };

export default connect(null, mapDispatchToProps)(SearchForm);
