import React from 'react';
import logo from './logo.svg';
import SearchForm from './features/searchForm/SearchForm';
import SearchList from './features/searchForm/SearchList';
import SearchResultsList from './features/searchResults/SearchResultsList';
import './App.css';

function App() {
  return (
    <div className="App">
      <div>
        <h3>Search Hacker News</h3>
        <SearchForm />
      </div>

      <div className="results">
          <SearchResultsList/>
      </div>

    </div>
  );
}

export default App;
