import React, { useState } from 'react';

const mapStateToProps = state => {
  return {
    results: state.searches.currResults
  };
};

const Result = ({ onClick, content, id }) => (
  <div
    style={{
      padding: '4px',
    }}
    key={id}
  >
    {id + 1}. {content.title} (<a href={content.url}>{content.url}</a>)
  </div>
);


export default Result;
