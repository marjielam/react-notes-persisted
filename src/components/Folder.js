import React from 'react';

const Folder = props => {
  return(
    <p className={`${props.className} list-item folder-name`} onClick={props.clickFolder}>
      {props.name}
    </p>
  );
}

export default Folder;
