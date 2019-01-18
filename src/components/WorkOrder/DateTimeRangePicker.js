import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DateTimeRangePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
      <div className="form-group">
        <label htmlFor={"hi"}>Scheduled Date</label>
        <div className="d-block">
          <DatePicker
            name={"hi"}
            selected={this.state.startDate}
            onChange={this.handleChange}
            className="form-control"
          />
        </div>
      </div>
    );
  }
}

export default DateTimeRangePicker;
