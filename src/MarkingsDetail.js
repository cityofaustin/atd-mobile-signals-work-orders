import React, { Component } from "react";
import axios from "axios";

class MarkingsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markingDetailData: []
    };
  }
  componentDidMount() {
    axios
      .get(
        // TODO: figure out which of these calls I need and consolidate
        `https://us-api.knack.com/v1/scenes/scene_713/views/view_1885/records/${
          this.props.markingId
        }`,
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
        this.setState({ markingDetailData: res.data });
      });
  }

  render() {
    return (
      <div>
        <h1>{this.state.markingDetailData.field_2287}</h1>
        <code>{JSON.stringify(this.state.markingDetailData)}</code>
      </div>
    );
  }
}

export default MarkingsDetail;
