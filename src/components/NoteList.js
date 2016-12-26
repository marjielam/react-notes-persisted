import React, { Component } from 'react';
import Note from './Note';
import NoteDetail from './NoteDetail';

class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    let selectedNote;
    let notes = this.props.noteData.map(note => {
      let clickNote = () => {
        this.props.handleNoteClick(note.id);
      }

      let className;
      if (note.id === this.props.selectedNoteId) {
        className = 'selected-note';
        selectedNote = note;
      }

      return(
        <Note
          key={note.id}
          body={note.body}
          updated_at={note.updated_at}
          clickNote={clickNote}
          className={className}
        />
      );
    });

    let showNoteDetail;
    if (selectedNote != null) {
      showNoteDetail =
      <NoteDetail
      key={selectedNote.id}
      body={selectedNote.body}
      updated_at={selectedNote.updated_at}
      updateNote={this.props.updateNote}
      deleteNote={this.props.deleteNote}
      />;
    } else {
      showNoteDetail = null;
    }

    return(
      <div>
        <div className="medium-4 columns third">
          <div className="input-group">
            <div className="input-group-button">
              <button type="submit" className="fa fa-sticky-note-o" onClick={this.props.createNote}> New Note</button>
            </div>
            <input className="input-group-field" type="text" placeholder="Search" id="search" onChange={this.props.searchNotes}/>
          </div>
          {notes}
        </div>
        <div className="medium-4 columns third">
          {showNoteDetail}
        </div>
      </div>
    );

  }
}

export default NoteList;
