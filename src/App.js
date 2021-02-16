import React from 'react';
import logo from './logo.svg';
import SearchForm from './features/searchForm/SearchForm';
import SearchList from './features/searchForm/SearchList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h3>Search Hacker News</h3>
      <SearchForm />
      <SearchList/>

    </div>
  );
}

export default App;
