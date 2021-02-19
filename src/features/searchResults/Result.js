import React, { useState } from 'react';

/*
  this is kinda going against the idea of functional component
  little too much going on here
*/

const RenderTag = (props) => (
  <sup>{props.contentTags[3] ? props.contentTags[3].split('_')[0] : props.contentTags[0]}</sup>
);

const Headline = (props) => {
  let headline = "";
  let re = new RegExp('^(Ask HN|Show HN|Poll):.(.*)');  // TODO refine this.

  if(props.content._tags[0] === "comment") {
    headline = props.content.comment_text.slice(0, 80).concat('...');
  } else if(props.content._tags[0] === "pollopt") {
    headline = "pollopt?";
  } else {
    headline = props.content.title.match(re) ? props.content.title.match(re)[2] : props.content.title;
  }


  return (
    <>
      {headline} {props.content.url && <a href={props.content.url}>{props.content.url}</a>}
    </>
  );
};

const Result = ({ onClick, content, id }) => {

   return (
    <div
      style={{
        padding: '4px',
      }}
      key={id}
    >
      <RenderTag contentTags={ content._tags }/> <Headline content={ content }/>
    </div>
  );
};


export default Result;
