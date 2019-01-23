import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DateTimeRangePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      startTime: new Date(),
      endDate: "",
      endTime: "",
      isAllDay: false
    };
  }

  handleChange(field, date) {
    let modifiedState = {};
    modifiedState[field] = date;
    this.setState(modifiedState, this.updateDateString);
  }

  toggleAllDay() {
    this.setState({ isAllDay: !this.state.isAllDay }, this.updateDateString);
  }

  updateDateString() {
    debugger;
    const { startDate, startTime, endDate, endTime, isAllDay } = this.state;
    let dateFieldObject = {
      date: this.getFormattedDate(startDate),
      hours: this.getFormatedTimeArray(startTime)[0],
      minutes: this.getFormatedTimeArray(startTime)[1],
      am_pm: this.getFormatedTimeArray(startTime)[2],
      all_day: isAllDay,
      to: {
        date: this.getFormattedDate(endDate),
        hours: this.getFormatedTimeArray(endTime)[0],
        minutes: this.getFormatedTimeArray(endTime)[1],
        am_pm: this.getFormatedTimeArray(endTime)[2]
      }
    };
    this.props.handleScheduledTimeChange(dateFieldObject);
  }

  getFormatedTimeArray(date) {
    // returns an array where the first value is the hour in 12 hour format,
    // second is minutes, third is a string either AM or PM.
    // Ex: [9, 53, "PM"]
    if (date === "") return "";

    let localTimeArray = date
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true
      })
      .split(/[\s:]+/); // split on " " & ":"

    localTimeArray.map((item, i) => {
      if (i < 2) {
        return Number(item);
      }
    });

    return localTimeArray;
  }

  getFormattedDate(date) {
    if (date === "") return "";

    let year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return `${month}/${day}/${year}`;
  }

  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.fieldName}>Scheduled Date</label>
        <div className="d-block">
          <DatePicker
            name="startDate"
            selected={this.state.startDate}
            onChange={this.handleChange.bind(this, "startDate")}
            className="form-control"
          />
          {!this.state.isAllDay && (
            <DatePicker
              selected={this.state.startTime}
              onChange={this.handleChange.bind(this, "startTime")}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              className="form-control"
              dateFormat="h:mm aa"
              timeCaption="Time"
              name="startTime"
            />
          )}
          <span>to</span>
          <DatePicker
            name="endDate"
            selected={this.state.startDate}
            onChange={this.handleChange.bind(this, "endDate")}
            className="form-control"
          />
          {!this.state.isAllDay && (
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange.bind(this, "endTime")}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              className="form-control"
              dateFormat="h:mm aa"
              timeCaption="Time"
              name="endTime"
            />
          )}
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value={this.state.isAllDay}
              onClick={this.toggleAllDay.bind(this)}
              id="allDayCheck"
            />
            <label className="form-check-label" htmlFor="allDayCheck">
              All day
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default DateTimeRangePicker;
