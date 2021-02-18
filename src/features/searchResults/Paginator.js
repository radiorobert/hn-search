import React, { useState } from 'react';
import { connect} from 'react-redux';
import { changePage }  from '../searchForm/searchSlice';
import { useDispatch } from 'react-redux';

const mapStateToProps = state => {
  return {
    pageNum: state.searches.pageNum,
    resultMeta: state.searches.resultMeta
  };
};

const mapDispatch = { changePage };

const Paginator = ({ pageNum, resultMeta, changePage }) => {
  const { nbPages } = resultMeta || -1;

  return(
    <>
      <button
        onClick={() => changePage(Number(-1))}
        disabled={ pageNum === 1 ? true : false }
      >
        &lt;&lt;
      </button>
      <span>&nbsp;{pageNum}&nbsp;</span>
      <button
        onClick={() => changePage(Number(1))}
        disabled={ pageNum === nbPages ? true : false }
      >
        &#62;&#62;
      </button>
    </>
  );
};


export default connect(
  mapStateToProps,
  mapDispatch
)(Paginator);
