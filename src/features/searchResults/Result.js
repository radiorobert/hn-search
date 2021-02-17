import React, { useState } from 'react';

const mapStateToProps = state => {
  return {
    results: state.searches.currResults
  };
};

const Result = ({ onClick, content }) => (
  <div
    style={{
      padding: '4px',
    }}
  >
    {content.title}<br/>{content.url}
  </div>
);


export default Result;
