import React, { Component } from 'react';
import { Camera } from './Image/Camera';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import api from '../../queries/api';
import Header from '../Shared/Header';
import dataURLtoBlob from 'blueimp-canvas-to-blob';

class AddImage extends Component {
  constructor() {
    super();
    this.camera = null;
    this.state = {
      capturedImage: null,
      captured: null,
      uploading: false,
    };
  }

  componentDidMount() {
    // initialize the camera
    this.canvasElement = document.createElement('canvas');
    this.webcam = new Camera(
      document.getElementById('webcam'),
      this.canvasElement
    );
    this.webcam.setup().catch(() => {
      alert('Error getting access to your camera');
    });
  }

  captureImage = async () => {
    const capturedData = this.webcam.takeBase64Photo({
      type: 'jpeg',
      quality: 0.8,
    });
    console.log(capturedData);
    this.setState({
      captured: true,
      capturedImage: capturedData.base64,
    });
  };

  discardImage = () => {
    this.setState({
      captured: false,
      capturedImage: null,
    });
  };

  uploadImage = () => {
    this.setState({ uploading: true });
    const image = this.state.capturedImage;
    const blob = dataURLtoBlob(image); // Convert base64 jpeg captured from canvas to blob
    const form = new FormData();
    form.append('files', blob, `${this.props.match.params.workOrderId}.jpeg`);
    api
      .workOrder()
      .addImage(form)
      .then(() => {
        this.setState({ uploading: false });
      });
  };

  render() {
    const imageDisplay = this.state.capturedImage ? (
      <img src={this.state.capturedImage} alt="captured" width="533" />
    ) : (
      <span />
    );

    const buttons = this.state.captured ? (
      <div>
        <button
          className="deleteButton btn btn-danger"
          onClick={this.discardImage}
        >
          <FontAwesomeIcon icon={faTrash} /> Delete Photo{' '}
        </button>{' '}
        <button
          className="captureButton btn btn-primary"
          onClick={this.uploadImage.bind(this)}
        >
          {'  '}
          <FontAwesomeIcon icon={faUpload} />
          Upload Photo{' '}
        </button>
      </div>
    ) : (
      <div>
        <button
          className="captureButton btn btn-primary"
          onClick={this.captureImage}
        >
          {' '}
          <FontAwesomeIcon icon={faCamera} /> Take Picture{' '}
        </button>
      </div>
    );

    const uploading = this.state.uploading ? (
      <div>
        <p> Uploading Image, please wait ... </p>
      </div>
    ) : (
      <span />
    );
    return (
      <div>
        <Header icon={faCamera} title="Add Image" />
        <div>
          {uploading}
          <video
            autoPlay
            playsInline
            muted
            id="webcam"
            width="100%"
            height="300"
          />
          <br />
          <div className="imageCanvas">{imageDisplay}</div>
          {buttons}
        </div>
      </div>
    );
  }
}

export default AddImage;
