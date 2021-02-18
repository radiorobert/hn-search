import React, { useState } from 'react';
import { connect} from 'react-redux';
import Result from './Result';
import Paginator from './Paginator';

const mapStateToProps = state => {
  return {
    results: state.searches.currResults
  };
};

const SearchResultsList = ({ results }) => {

  return (
    <div>
      <h3>Search Results</h3>
      {results && <Paginator/> }
      <ul>
        {results && results.map((hit, id) => (
          <Result
            content={hit}
            id={id}
          />

        ))}
      </ul>
    </div>
  );
};


export default connect(mapStateToProps)(SearchResultsList);
