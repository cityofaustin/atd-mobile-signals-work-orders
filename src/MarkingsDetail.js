import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import {
  faWrench,
  faInfoCircle,
  faClipboard,
  faPaperclip
} from "@fortawesome/free-solid-svg-icons";

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

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
      markingDetailData: []
    };
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
        <Accordion>
          <AccordionItem>
            <AccordionItemTitle>
              <h3>
                <FontAwesomeIcon icon={faInfoCircle} /> Marking Details
              </h3>
            </AccordionItemTitle>
            <AccordionItemBody>
              {fields.map(field => (
                <dl>
                  <dt>{Object.keys(field)[0]}</dt>
                  <dd>
                    {this.state.markingDetailData[Object.values(field)[0]]}
                  </dd>
                </dl>
              ))}
            </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemTitle>
              <h3>
                <FontAwesomeIcon icon={faComments} /> Comments
              </h3>
            </AccordionItemTitle>
            <AccordionItemBody>
              <p>Body content</p>
            </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemTitle>
              <h3>
                {" "}
                <FontAwesomeIcon icon={faClipboard} /> Jobs
              </h3>
            </AccordionItemTitle>
            <AccordionItemBody>
              <p>Body content</p>
            </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemTitle>
              <h3>
                <FontAwesomeIcon icon={faPaperclip} /> Attachments
              </h3>
            </AccordionItemTitle>
            <AccordionItemBody>
              <p>Body content</p>
            </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }
}

export default MarkingsDetail;
