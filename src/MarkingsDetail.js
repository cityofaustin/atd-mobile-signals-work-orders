import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import {
  faWrench,
  faInfoCircle,
  faClipboard,
  faPaperclip,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

const detailsFields = [
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
      markingDetailData: false,
      commentsData: false,
      jobsData: false,
      attachmentsData: false
    };
    this.requestOptions = {
      headers: {
        "X-Knack-Application-Id": "5b633d68c04cc40730078ac3",
        "X-Knack-REST-API-KEY": "knack",
        Authorization: this.props.knackUserToken,
        "content-type": "application/json"
      }
    };
  }

  componentDidMount() {
    this.requestMarkingDetailsData();
  }

  requestMarkingDetailsData = () => {
    axios
      .get(
        `https://us-api.knack.com/v1/scenes/scene_713/views/view_1885/records/${
          this.props.markingId
        }`,
        this.requestOptions
      )
      .then(res => {
        console.log(res);
        this.setState({ markingDetailData: res.data });
      });
  };

  requestCommentsData = () => {
    axios
      .get(
        `https://us-api.knack.com/v1/scenes/scene_713/views/view_1953/records?view-work-orders-marking-details_id=/${
          this.props.markingId
        }`,
        this.requestOptions
      )
      .then(res => {
        console.log("commentsData", res);
        this.setState({ commentsData: res.data.records });
      });
  };

  requestJobsData = () => {
    axios
      .get(
        `https://us-api.knack.com/v1/scenes/scene_713/views/view_2158/records?view-work-orders-marking-details_id=${
          this.props.markingId
        }`,
        this.requestOptions
      )
      .then(res => {
        console.log("jobsData", res);
        this.setState({ jobsData: res.data.records });
      });
  };

  requestAttachmentsData = () => {
    axios
      .get(
        `https://us-api.knack.com/v1/scenes/scene_713/views/view_1975/records?view-work-orders-marking-details_id=${
          this.props.markingId
        }`,
        this.requestOptions
      )
      .then(res => {
        console.log("attachmentsData", res);
        this.setState({ attachmentsData: res.data.records });
      });
  };

  render() {
    return (
      <div>
        <h1>
          <FontAwesomeIcon icon={faWrench} />{" "}
          {this.state.markingDetailData.field_2287}
        </h1>
        <Accordion>
          <AccordionItem>
            <AccordionItemTitle>
              <h3 className="u-position-relative">
                <FontAwesomeIcon icon={faInfoCircle} /> Marking Details
                <div className="accordion__arrow" role="presentation" />
              </h3>
            </AccordionItemTitle>
            <AccordionItemBody>
              {detailsFields.map(field => (
                <dl>
                  <dt>{Object.keys(field)[0]}</dt>
                  <dd>
                    {this.state.markingDetailData[Object.values(field)[0]]}
                  </dd>
                </dl>
              ))}
            </AccordionItemBody>
          </AccordionItem>
          <AccordionItem onClick={this.requestCommentsData}>
            <AccordionItemTitle>
              <h3 className="u-position-relative">
                <FontAwesomeIcon icon={faComments} /> Comments
                <div className="accordion__arrow" role="presentation" />
              </h3>
            </AccordionItemTitle>
            <AccordionItemBody>
              {this.state.commentsData.length === 0 && <p>No data</p>}
              {this.state.commentsData.length > 0 && (
                <ul className="list-group list-group-flush">
                  {this.state.commentsData.map(comment => (
                    <li className="list-group-item d-flex row">
                      <div className="col-12">{comment.field_2192}</div>
                      <div className="col-6">{comment.field_2193}</div>
                      <div
                        className="col-6"
                        dangerouslySetInnerHTML={{ __html: comment.field_2194 }}
                      >
                        {}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {!this.state.commentsData && (
                <div>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    size="2x"
                    className="atd-spinner"
                  />
                </div>
              )}
            </AccordionItemBody>
          </AccordionItem>
          <AccordionItem onClick={this.requestJobsData}>
            <AccordionItemTitle>
              <h3 className="u-position-relative">
                <FontAwesomeIcon icon={faClipboard} /> Jobs
                <div className="accordion__arrow" role="presentation" />
              </h3>
            </AccordionItemTitle>
            <AccordionItemBody>
              {this.state.jobsData.length === 0 && <p>No data</p>}
              {this.state.jobsData.length > 0 && (
                <ul className="list-group list-group-flush">
                  {this.state.jobsData.map(comment => (
                    <li className="list-group-item d-flex row">
                      <div className="col-12">{comment.field_2173}</div>
                      <div className="col-6">{comment.field_2190}</div>
                      <div
                        className="col-6"
                        dangerouslySetInnerHTML={{ __html: comment.field_2196 }}
                      >
                        {}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {!this.state.jobsData && (
                <div>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    size="2x"
                    className="atd-spinner"
                  />
                </div>
              )}
            </AccordionItemBody>
          </AccordionItem>
          <AccordionItem onClick={this.requestAttachmentsData}>
            <AccordionItemTitle>
              <h3 className="u-position-relative">
                <FontAwesomeIcon icon={faPaperclip} /> Attachments
                <div className="accordion__arrow" role="presentation" />
              </h3>
            </AccordionItemTitle>
            <AccordionItemBody>
              {this.state.attachmentsData.length === 0 && <p>No data</p>}
              {this.state.attachmentsData.length > 0 && (
                <ul className="list-group list-group-flush">
                  {this.state.attachmentsData.map(comment => (
                    <li className="list-group-item d-flex row">
                      <div className="col-4">{comment.field_2403}</div>
                      <div className="col-4">{comment.field_2407}</div>
                      <div
                        className="col-4"
                        dangerouslySetInnerHTML={{ __html: comment.field_2406 }}
                      />
                      <div
                        className="col-12"
                        dangerouslySetInnerHTML={{ __html: comment.field_2405 }}
                      />
                    </li>
                  ))}
                </ul>
              )}
              {!this.state.attachmentsData && (
                <div>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    size="2x"
                    className="atd-spinner"
                  />
                </div>
              )}
            </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }
}

export default MarkingsDetail;
