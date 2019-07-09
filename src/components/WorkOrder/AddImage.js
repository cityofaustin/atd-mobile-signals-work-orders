import React, { Component } from 'react';
import { Camera } from './Image/Camera';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Header from '../Shared/Header';

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
  render() {
    const imageDisplay = this.state.capturedImage ? (
      <img src={this.state.capturedImage} alt="captured" width="533" />
    ) : (
      <span />
    );

    const buttons = this.state.captured ? (
      <div>
        <button className="deleteButton" onClick={this.discardImage}>
          {' '}
          Delete Photo{' '}
        </button>
        <button className="captureButton" onClick={this.uploadImage}>
          {' '}
          Upload Photo{' '}
        </button>
      </div>
    ) : (
      <button className="captureButton" onClick={this.captureImage}>
        {' '}
        Take Picture{' '}
      </button>
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
    const url = ``;
    axios
      .post(url, {
        file: this.state.capturedImage,
        upload_preset: process.env.REACT_APP_CLOUD_PRESET,
      })
      .then(data => this.checkUploadStatus(data))
      .catch(error => {
        alert('Sorry, we encountered an error uploading your image');
        this.setState({ uploading: false });
      });
  };
}

export default AddImage;
