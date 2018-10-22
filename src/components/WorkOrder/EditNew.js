import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import api from "../../queries/api";

const fields = {
  LOCATION_NAME: "field_211_raw",
  WORK_TYPE_TROUBLE_CALL: "field_976",
  WORK_TYPE_SCHEDULED_WORK: "field_900",
  ASSET_TYPE: "field_977"
};

class EditNewWorkOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workOrderDetails: {}
    };
    this.workOrderId = this.props.match.params.workOrderId;
  }
  componentDidMount() {
    api
      .workOrder()
      .getEditNewWorkOrderDetails(this.workOrderId)
      .then(res => this.setState({ workOrderDetails: res.data }));

    if (this.props.knackObject) {
      const scene = this.props.knackObject.scenes.models.find(
        item => item.attributes.key === "scene_328"
      );
      console.log(scene);
    }
  }

  render() {
    const { workOrderDetails } = this.state;
    return (
      <div>
        <h1>Edit New Work Order</h1>
        <h2>
          <FontAwesomeIcon icon={faWrench} />{" "}
          {workOrderDetails[fields.LOCATION_NAME]}
        </h2>
        <div className="row">
          <div className="col-6">
            <h4>{workOrderDetails[fields.ASSET_TYPE]}</h4>
          </div>
          <div className="col-6">
            <h4>{workOrderDetails[fields.WORK_TYPE_TROUBLE_CALL]}</h4>
            <h4>{workOrderDetails[fields.WORK_TYPE_SCHEDULED_WORK]}</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default EditNewWorkOrder;
