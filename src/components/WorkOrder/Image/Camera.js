import React from 'react';

export class Camera {
  constructor(webcamElement, canvasElement) {
    this.webcamElement = webcamElement;
    this.canvasElement = canvasElement;
  }

  adjustVideoSize(width, height) {
    const aspectRatio = width / height;
    if (width >= height) {
      this.webcamElement.width = aspectRatio * this.webcamElement.height;
    } else {
      this.webcamElement.height = this.webcamElement.width / aspectRatio;
    }
  }

  async setup() {
    return new Promise((resolve, reject) => {
      if (navigator.mediaDevices.getUserMedia !== undefined) {
        navigator.mediaDevices
          .getUserMedia({
            audio: false,
            video: { facingMode: 'environment' },
          })
          .then(mediaStream => {
            if ('srcObject' in this.webcamElement) {
              this.webcamElement.srcObject = mediaStream;
            } else {
              // For older browsers without the srcObject.
              this.webcamElement.src = window.URL.createObjectURL(mediaStream);
            }
            this.webcamElement.addEventListener(
              'loadeddata',
              async () => {
                this.adjustVideoSize(
                  this.webcamElement.videoWidth,
                  this.webcamElement.videoHeight
                );
                resolve();
              },
              false
            );
          });
      } else {
        reject();
      }
    });
  }

  _drawImage() {
    const imageWidth = this.webcamElement.videoWidth;
    const imageHeight = this.webcamElement.videoHeight;

    const context = this.canvasElement.getContext('2d');
    this.canvasElement.width = imageWidth;
    this.canvasElement.height = imageHeight;

    context.drawImage(this.webcamElement, 0, 0, imageWidth, imageHeight);
    return { imageHeight, imageWidth };
  }

  takeBlobPhoto() {
    const { imageWidth, imageHeight } = this._drawImage();
    return new Promise((resolve, reject) => {
      this.canvasElement.toBlob(blob => {
        resolve({ blob, imageHeight, imageWidth });
      });
    });
  }

  takeBase64Photo({ type, quality } = { type: 'png', quality: 1 }) {
    const { imageHeight, imageWidth } = this._drawImage();
    const base64 = this.canvasElement.toDataURL('image/' + type, quality);
    return { base64, imageHeight, imageWidth };
  }

  render() {
    return <div />;
  }

  stop() {
    this.webcamElement.srcObject.getTracks().map(function(val) {
      val.stop();
    });
  }
}
export default Camera;
