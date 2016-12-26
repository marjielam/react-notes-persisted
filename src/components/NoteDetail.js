import React from 'react';

const NoteDetail = props => {
  return (
    <div>
      <div className="input-group">
        <span className="input-group-label">Updated on {props.updated_at}</span>
        <div className="input-group-button">
          <button type="submit" className="update-delete" onClick={props.updateNote}>Update</button>
        </div>
        <div className="input-group-button ">
          <button type="submit" className="update-delete" onClick={props.deleteNote}>Delete</button>
        </div>
      </div>
      <textarea defaultValue={props.body} id="note-input"/>
    </div>
  );
}

export default NoteDetail;
