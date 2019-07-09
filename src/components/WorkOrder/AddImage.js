import React, { Component } from 'react';
import { Camera } from './Image/Camera';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

import Header from '../Shared/Header';

class AddImage extends Component {
  render() {
    return (
      <div>
        <Header icon={faCamera} title="Add Image" />
      </div>
    );
  }
}

export default AddImage;
