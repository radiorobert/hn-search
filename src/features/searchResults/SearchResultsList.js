import React, { useState } from 'react';
import { connect} from 'react-redux';
import Result from './Result';

const mapStateToProps = state => {
  return {
    results: state.searches.currResults
  };
};

const SearchResultsList = ({ results }) => {

  return (
    <div>
      <h3>Search Results</h3>
      <ul>
        {results && results.map((hit, id) => (
          <Result
            content={hit}
          />

        ))}
      </ul>
    </div>
  );
};


export default connect(mapStateToProps)(SearchResultsList);
