import React, { Component } from "react";
import { ImagePicker } from "react-file-picker";
import dataURLtoBlob from "blueimp-canvas-to-blob";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faSpinner } from "@fortawesome/free-solid-svg-icons";
import api from "../../queries/api";

class UploadImage extends Component {
  constructor(props) {
    super();
    this.state = {
      uploading: false,
    };
  }

  uploadImage = base64Image => {
    this.setState({ uploading: true });
    const id = this.props.id;
    const form = new FormData();
    const blob = dataURLtoBlob(base64Image); // Convert base64 jpeg captured from canvas to blob
    form.append("files", blob, `${id}.jpeg`);
    api
      .workOrder()
      .addImage(form, id)
      .then(() => {
        this.setState({ uploading: false });
        // setTimeout here allows delay on Knack end resolve and get most recent images in view
        setTimeout(() => this.props.requestImages(id), 2000);
      });
  };

  render() {
    return this.state.uploading ? (
      <FontAwesomeIcon icon={faSpinner} size="2x" className="atd-spinner" />
    ) : (
      <ImagePicker
        extensions={["jpg", "jpeg", "png"]}
        maxSize={5} // Default is 2MB so increased to 5 since tablet's images are larger
        dims={{
          minWidth: 100,
          minHeight: 100,
        }}
        onChange={this.uploadImage}
        onError={errMsg => console.log(errMsg)}
      >
        <button className={`btn btn-secondary btn-lg mb-2`}>
          <FontAwesomeIcon icon={faUpload} /> Upload Picture
        </button>
      </ImagePicker>
    );
  }
}

export default UploadImage;
