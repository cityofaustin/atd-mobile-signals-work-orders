import React, { Component } from "react";
import Select from "react-select";

import { FIELDS } from "./formConfig";
import api from "../../queries/api";

export default class AssignTechnicianFields extends Component {
  constructor(props) {
    super(props);

    this.state = {
      technicianOptions: [],
    };
  }

  componentDidMount() {
    this.getTechnicianOptions();
  }

  getTechnicianOptions = () => {
    api
      .workOrder()
      .technicians()
      .then(res => {
        const technicianOptions = res.data.records.map(item => {
          return { label: item.identifier, value: item.id };
        });
        this.setState({ technicianOptions });
      });
  };

  getSupportTechnicianDefaultValue = () => {
    let data = this.props.data[FIELDS.SUPPORT_TECHNICIANS];
    let rawData = this.props.data[`${FIELDS.SUPPORT_TECHNICIANS}_raw`];

    let currentData = rawData ? rawData : data;
    // handle no assigned Technicians
    currentData =
      currentData === ""
        ? currentData
        : currentData.map(item => ({
            value: item.id,
            label: item.identifier,
          }));
    return currentData;
  };

  render() {
    return (
      <>
        {this.props.data[FIELDS.ASSIGN_TO_SELF] === "No" && (
          <div className="form-group">
            <label htmlFor={FIELDS.LEAD_TECHNICIAN}>Lead Technician</label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={this.props.data[FIELDS.LEAD_TECHNICIAN]}
              isClearable
              isSearchable
              name={FIELDS.LEAD_TECHNICIAN}
              options={this.state.technicianOptions}
              onChange={e =>
                this.props.handleLeadTechnicianFieldChange(
                  FIELDS.LEAD_TECHNICIAN,
                  e
                )
              }
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor={FIELDS.SUPPORT_TECHNICIANS}>
            Support Technician(s)
          </label>
          <Select
            className="basic-multi-select"
            classNamePrefix="select"
            isMulti
            defaultValue={this.getSupportTechnicianDefaultValue()}
            name={FIELDS.SUPPORT_TECHNICIANS}
            options={this.state.technicianOptions}
            onChange={this.props.handleSupportTechniciansFieldChange.bind(
              this,
              FIELDS.SUPPORT_TECHNICIANS
            )}
          />
        </div>
      </>
    );
  }
}
