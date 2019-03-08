import React from "react";

import DateTimeRangePicker from "./DateTimeRangePicker";
import FormGroup from "../Form/FormGroup";
import { FIELDS, YES_NO_OPTIONS } from "./formConfig";

const ScheduleFields = ({
  data,
  toggleScheduleChange,
  handleScheduledTimeChange
}) => {
  return (
    <>
      <FormGroup
        label="Schedule Immediately"
        defaultValue={data[FIELDS.SCHEDULE_IMMEDIATELY]}
        fieldId={FIELDS.SCHEDULE_IMMEDIATELY}
        onChangeHandler={toggleScheduleChange}
        options={YES_NO_OPTIONS}
        inputType="basicSelect"
      />

      {data[FIELDS.SCHEDULE_IMMEDIATELY] === "No" && (
        <DateTimeRangePicker
          data={data}
          fieldName={FIELDS.WORK_SCHEDULED_DATE}
          handleScheduledTimeChange={handleScheduledTimeChange}
        />
      )}
    </>
  );
};

export default ScheduleFields;
