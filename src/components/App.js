import React, { Component } from 'react';
import FolderList from './FolderList';
import NoteList from './NoteList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      folderData: [],
      noteData: [],
      selectedFolderId: 1,
      selectedNoteId: null,
      searching: false,
      matchingNotes: []
    };
    this.handleFolderClick = this.handleFolderClick.bind(this);
    this.handleNoteClick = this.handleNoteClick.bind(this);
    this.createFolder = this.createFolder.bind(this);
    this.createNote = this.createNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.searchNotes = this.searchNotes.bind(this);
  }

  handleFolderClick(id) {
    this.setState({ selectedFolderId: id });
    this.getNoteData(id);
    this.setState({ selectedNoteId: null });
  }

  handleNoteClick(id) {
    this.setState({ selectedNoteId: id });
  }

  createFolder() {
    let newFolderName = document.getElementById("folder-input").value;
    let newFolderData = {
      "folder": {
        "name": newFolderName
      }
    };
    let jsonStringData = JSON.stringify(newFolderData);
    fetch('http://localhost:4567/folders.json', {
      method: 'post',
      body: jsonStringData
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    this.getFolderData();
    document.getElementById("folder-input").value = '';
  }

  createNote() {
    let createInFolder = this.state.selectedFolderId;
    let newNoteData = {
      "note": {
          "body": "New Note"
      }
    }
    let jsonStringData = JSON.stringify(newNoteData);
    fetch(`http://localhost:4567/folders/${createInFolder}/notes.json`, {
      method: 'post',
      body: jsonStringData,
      mode: 'no-cors'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
    this.getNoteData(createInFolder);
  }

  searchNotes() {
    if (document.getElementById('search').value.length > 0) {
      let searchString = document.getElementById('search').value;
      let allNotes = this.state.noteData;
      let matchingNotes = [];
      allNotes.forEach(function(note) {
        if (note.body.includes(searchString)) {
          matchingNotes.push(note);
        }
      });
      this.setState({ searching: true, matchingNotes: matchingNotes });
    } else {
      this.setState({ searching: false });
    }
  }

  updateNote() {
    let updatedNoteText = document.getElementById("note-input").value;
    let updatedNoteId = this.state.selectedNoteId;
    let updatedNoteData = {
      "note": {
          "body": updatedNoteText
      }
    }
    let jsonStringData = JSON.stringify(updatedNoteData);
    fetch(`http://localhost:4567/notes/${updatedNoteId}.json`, {
      method: 'PATCH',
      body: jsonStringData
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
    this.getNoteData(this.state.selectedFolderId);
  }

  deleteNote() {
    let deleteNoteId = this.state.selectedNoteId;
    fetch(`http://localhost:4567/notes/${deleteNoteId}.json`, {
      method: 'delete'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
    this.getNoteData(this.state.selectedFolderId);
  }

  getFolderData() {
    fetch('http://localhost:4567/folders.json')
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(responseBody => {
        this.setState({ folderData: responseBody.folders });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getNoteData(folderId) {
    fetch(`http://localhost:4567/folders/${folderId}/notes.json`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(responseBody => {
        this.setState({ noteData: responseBody.notes });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getFolderData();
    this.getNoteData(this.state.selectedFolderId);
  }

  render() {
    let displayNote;
    if (this.state.searching) {
      displayNote = <NoteList
        noteData={this.state.matchingNotes}
        handleNoteClick={this.handleNoteClick}
        selectedNoteId={this.state.selectedNoteId}
        createNote={this.createNote}
        updateNote={this.updateNote}
        deleteNote={this.deleteNote}
        searchNotes={this.searchNotes}
      />
    }
    else {
      displayNote = <NoteList
        noteData={this.state.noteData}
        handleNoteClick={this.handleNoteClick}
        selectedNoteId={this.state.selectedNoteId}
        createNote={this.createNote}
        updateNote={this.updateNote}
        deleteNote={this.deleteNote}
        searchNotes={this.searchNotes}
      />
    }

    return (
      <div>
        <FolderList
          folderData={this.state.folderData}
          handleFolderClick={this.handleFolderClick}
          selectedFolderId={this.state.selectedFolderId}
          createFolder={this.createFolder}
        />
        {displayNote}
      </div>
    );
  }
};

export default App;
