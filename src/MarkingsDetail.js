import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";

const fields = [
  { "Street Segment ID": "field_2591" },
  { Status: "field_2181" },
  { "Work Groups": "field_2203" },
  { Area: "field_2164" },
  { School: "field_2171" },
  { "Needs Coordination": "field_2204" },
  { Instructions: "field_2169" },
  { ID: "field_2160" },
  { "Work Type": "field_2292" },
  { Requester: "field_2162" },
  { "Requester Work Order ID": "field_2400" },
  { "Created By": "field_2146" },
  { "Created Date": "field_2148" },
  { "Modified Date": "field_2150" },
  { "Modified By": "field_2149" }
];

class MarkingsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markingDetailData: [],
      open: false
    };
  }

  toggleCollaspingPanel = () => {
    this.setState({ open: !this.state.open });
  };

  renderCollapsingClass() {
    let klass = "";

    if (this.state.open) {
      klass = "collapse show";
    } else {
      klass = "collapse";
    }
    return klass;
  }

  componentDidMount() {
    axios
      .get(
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
        <h1>
          <FontAwesomeIcon icon={faWrench} />{" "}
          {this.state.markingDetailData.field_2287}
        </h1>
        <div className="accordion" id="accordionExample">
          <div className="card">
            <div className="card-header" id="headingOne">
              <h5 className="mb-0">
                <button
                  className="btn btn-link"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                  onClick={this.toggleCollaspingPanel}
                >
                  Marking Details
                </button>
              </h5>
            </div>

            <div
              id="collapseOne"
              className={this.renderCollapsingClass()}
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              <div class="card-body">
                {fields.map(field => (
                  <dl>
                    <dt>{Object.keys(field)[0]}</dt>
                    <dd>
                      {this.state.markingDetailData[Object.values(field)[0]]}
                    </dd>
                  </dl>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MarkingsDetail;
