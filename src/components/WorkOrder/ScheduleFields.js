import React, { Component } from "react";

import DateTimeRangePicker from "./DateTimeRangePicker";
import FormGroup from "../Form/FormGroup";
import { FIELDS, YES_NO_OPTIONS } from "./formConfig";

export default class ScheduleFields extends Component {
  render() {
    return (
      <>
        <FormGroup
          label="Schedule Immediately"
          defaultValue={this.props.formData[FIELDS.SCHEDULE_IMMEDIATELY]}
          fieldId={FIELDS.SCHEDULE_IMMEDIATELY}
          onChangeHandler={this.props.toggleScheduleChange}
          options={YES_NO_OPTIONS}
          inputType="basicSelect"
        />

        {this.props.formData[FIELDS.SCHEDULE_IMMEDIATELY] === "No" && (
          <DateTimeRangePicker
            fieldName={FIELDS.WORK_SCHEDULED_DATE}
            handleScheduledTimeChange={this.props.handleScheduledTimeChange}
          />
        )}
      </>
    );
  }
}
