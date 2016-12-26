import React, { Component } from 'react';
import Folder from './Folder';

class FolderList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    let folders = this.props.folderData.map(folder => {
      let clickFolder = () => {
        this.props.handleFolderClick(folder.id);
      };

      let className;
      if (folder.id === this.props.selectedFolderId) {
        className = 'selected-folder';
      }

      return (
        <Folder
          key={folder.id}
          name={folder.name}
          clickFolder={clickFolder}
          className={className}
        />
      );
    });

    return (
      <div className="medium-4 columns third">
        <h1>Folders</h1>
        {folders}
        <div className="input-group">
          <div className="input-group-button">
            <button type="submit" className="fa fa-plus-circle" onClick={this.props.createFolder}/>
          </div>
          <input className="input-group-field" type="text" placeholder="New Folder" id="folder-input"/>
        </div>
      </div>
    );
  }
}

export default FolderList;
