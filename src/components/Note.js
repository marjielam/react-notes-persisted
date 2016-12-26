import React from 'react';

const Note = props => {
  return(
    <div className={`${props.className} list-item`} onClick={props.clickNote}>
      <div className="note-short">{props.body}</div>
      <div>{props.updated_at}</div>
    </div>
  );
}

export default Note;
