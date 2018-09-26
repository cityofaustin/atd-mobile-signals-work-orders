import React, { Component } from "react";
import axios from "axios";

class MarkingsDetail extends Component {
  componentDidMount() {
    // this.props.requestKnackViewData("scene_713", "view_1885");

    axios
      .get(
        // TODO: figure out which of these calls I need and consolidate
        // https://us-api.knack.com/v1/scenes/scene_713/views/view_1953/records?format=both&page=1&rows_per_page=100&view-work-orders-marking-details_id=5b6346babe8a9707688b3e93&sort_field=field_2193&sort_order=asc&_=1537938348681
        // https://us-api.knack.com/v1/scenes/scene_713/views/view_1886/records?format=both&page=1&rows_per_page=25&view-work-orders-marking-details_id=5b6346babe8a9707688b3e93&sort_field=field_2173&sort_order=asc&_=1537938348684
        // https://us-api.knack.com/v1/scenes/scene_713/views/view_1975/records?format=both&page=1&rows_per_page=100&view-work-orders-marking-details_id=5b6346babe8a9707688b3e93&sort_field=field_2407&sort_order=asc&_=1537938348686
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
      });
  }

  render() {
    console.log(JSON.stringify(this.props.knackData));
    return <code>{JSON.stringify(this.props.knackData)}</code>;
  }
}

export default MarkingsDetail;
