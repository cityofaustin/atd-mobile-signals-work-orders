import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";

class JobDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requesterDetails: []
    };
  }
  componentDidMount() {
    axios
      .get(
        `https://us-api.knack.com/v1/scenes/scene_713/views/view_1885/records`,
        {
          headers: {
            "X-Knack-Application-Id": "5b633d68c04cc40730078ac3",
            "X-Knack-REST-API-KEY": "knack",
            Authorization: this.props.knackUserToken,
            "content-type": "application/json"
          }
        }
      )
      .then(res => {
        console.log(res);
        this.setState({ requesterDetails: res.data.records });
      });
  }
  render() {
    return (
      <div>
        <h1>
          <FontAwesomeIcon icon={faClipboard} />
          Job Details
        </h1>
      </div>
    );
  }
}

export default JobDetail;
