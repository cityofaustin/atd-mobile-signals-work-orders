import React, { Component } from "react";
import Autocomplete from "react-autocomplete";

import api from "../../queries/api";
import { FIELDS, ASSET_TYPE_OPTIONS } from "./formConfig";

export default class AssetTypeField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signalOptions: [],
      signalName: "",
      schoolZoneOptions: [],
      schoolZoneName: "",
      cameraOptions: [],
      cameraName: "",
      hazardFlasherOptions: [],
      hazardFlasherName: "",
      dmsOptions: [],
      dmsName: "",
      sensorOptions: [],
      sensorName: ""
    };
  }

  componentDidMount() {
    this.getSchoolZoneOptions();
    this.getSignalsOptions(this.state.signalName);
    this.getCameraOptions(this.state.cameraName);
    this.getHazardFlasherOptions();
    this.getDmsOptions();
    this.getSensorOptions();
  }

  getSignalsOptions = searchValue => {
    api
      .workOrder()
      .signals(searchValue)
      .then(res => {
        this.setState({ signalOptions: res.data.records });
      });
  };

  getCameraOptions = searchValue => {
    api
      .workOrder()
      .cameras(searchValue)
      .then(res => {
        this.setState({ cameraOptions: res.data.records });
      });
  };

  getSchoolZoneOptions = () => {
    api
      .workOrder()
      .schoolZones()
      .then(res => {
        this.setState({ schoolZoneOptions: res.data.records });
      });
  };

  getHazardFlasherOptions = () => {
    api
      .workOrder()
      .hazardFlashers()
      .then(res => {
        this.setState({ hazardFlasherOptions: res.data.records });
      });
  };

  getDmsOptions = () => {
    api
      .workOrder()
      .dmses()
      .then(res => {
        this.setState({ dmsOptions: res.data.records });
      });
  };

  getSensorOptions = () => {
    api
      .workOrder()
      .sensors()
      .then(res => {
        this.setState({ sensorOptions: res.data.records });
      });
  };

  render() {
    return (
      <>
        <div className="form-group">
          <label htmlFor={FIELDS.ASSET_TYPE}>Asset Type</label>
          <select
            className="form-control"
            id={FIELDS.ASSET_TYPE}
            name={FIELDS.ASSET_TYPE}
            onChange={this.props.handleChange}
            defaultValue={this.props.formData[FIELDS.ASSET_TYPE]}
          >
            {ASSET_TYPE_OPTIONS.map(option => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Autocomplete for Signals */}
        {this.props.formData[FIELDS.ASSET_TYPE] === "Signal" && (
          <div className="form-group">
            <label htmlFor={FIELDS.ASSETS["Signal"].fieldId}>
              {FIELDS.ASSETS["Signal"].label}
            </label>
            <Autocomplete
              getItemValue={item => item.id}
              items={this.state.signalOptions}
              inputProps={{
                className: "form-control",
                name: FIELDS.ASSETS["Signal"].fieldId,
                placeholder: "Type to search..."
              }}
              wrapperStyle={{ display: "block" }}
              menuStyle={{
                borderRadius: "3px",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                background: "rgba(255, 255, 255, 0.9)",
                padding: "2px 0",
                fontSize: "120%",
                position: "fixed",
                overflow: "auto",
                zIndex: "999",
                maxHeight: "50%"
              }}
              renderItem={(item, isHighlighted) => (
                <div
                  key={item.id}
                  style={{
                    background: isHighlighted ? "lightgray" : "white",
                    padding: "2px 5px"
                  }}
                >
                  {item.identifier}
                </div>
              )}
              shouldItemRender={(item, value) =>
                item.identifier.toLowerCase().indexOf(value.toLowerCase()) > -1
              }
              value={this.state.signalName}
              onChange={this.handleSignalChange}
              onSelect={(value, item) => {
                let formData = this.props.formData;
                formData[FIELDS.ASSETS["Signal"].fieldId] = value;
                this.setState({ formData, signalName: item.identifier });
              }}
            />
          </div>
        )}

        {/* Autocomplete for Cameras */}
        {this.props.formData[FIELDS.ASSET_TYPE] === "Camera" && (
          <div className="form-group">
            <label htmlFor={FIELDS.ASSETS["Camera"].fieldId}>
              {FIELDS.ASSETS["Camera"].label}
            </label>
            <Autocomplete
              getItemValue={item => item.id}
              items={this.state.cameraOptions}
              inputProps={{
                className: "form-control",
                name: FIELDS.ASSETS["Camera"].fieldId,
                placeholder: "Type to search..."
              }}
              wrapperStyle={{ display: "block" }}
              menuStyle={{
                borderRadius: "3px",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                background: "rgba(255, 255, 255, 0.9)",
                padding: "2px 0",
                fontSize: "120%",
                position: "fixed",
                overflow: "auto",
                zIndex: "999",
                maxHeight: "50%"
              }}
              renderItem={(item, isHighlighted) => (
                <div
                  key={item.id}
                  style={{
                    background: isHighlighted ? "lightgray" : "white",
                    padding: "2px 5px"
                  }}
                >
                  {item.identifier}
                </div>
              )}
              shouldItemRender={(item, value) =>
                item.identifier.toLowerCase().indexOf(value.toLowerCase()) > -1
              }
              value={this.state.cameraName}
              onChange={this.handleCameraChange}
              onSelect={(value, item) => {
                let formData = this.props.formData;
                formData[FIELDS.ASSETS["Camera"].fieldId] = value;
                this.setState({ formData, cameraName: item.identifier });
              }}
            />
          </div>
        )}

        {/* Autocomplete for School Zones */}
        {this.props.formData[FIELDS.ASSET_TYPE] === "School Beacon" && (
          <div className="form-group">
            <label htmlFor={FIELDS.ASSETS["School Beacon"].fieldId}>
              {FIELDS.ASSETS["School Beacon"].label}
            </label>
            <Autocomplete
              getItemValue={item => item.id}
              items={this.state.schoolZoneOptions}
              inputProps={{
                className: "form-control",
                name: FIELDS.ASSETS["School Beacon"].fieldId,
                placeholder: "Type to search..."
              }}
              wrapperStyle={{ display: "block" }}
              menuStyle={{
                borderRadius: "3px",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                background: "rgba(255, 255, 255, 0.9)",
                padding: "2px 0",
                fontSize: "120%",
                position: "fixed",
                overflow: "auto",
                zIndex: "999",
                maxHeight: "50%"
              }}
              renderItem={(item, isHighlighted) => (
                <div
                  key={item.id}
                  style={{
                    background: isHighlighted ? "lightgray" : "white",
                    padding: "2px 5px"
                  }}
                >
                  {item.identifier}
                </div>
              )}
              shouldItemRender={(item, value) =>
                item.identifier.toLowerCase().indexOf(value.toLowerCase()) > -1
              }
              value={this.state.schoolZoneName}
              onChange={e => this.setState({ schoolZoneName: e.target.value })}
              onSelect={(value, item) => {
                let formData = this.props.formData;
                formData[FIELDS.ASSETS["School Beacon"].fieldId] = value;
                this.setState({ formData, schoolZoneName: item.identifier });
              }}
            />
          </div>
        )}

        {/* Autocomplete for Hazard Flasher */}
        {this.props.formData[FIELDS.ASSET_TYPE] === "Hazard Flasher" && (
          <div className="form-group">
            <label htmlFor={FIELDS.ASSETS["Hazard Flasher"].fieldId}>
              {FIELDS.ASSETS["Hazard Flasher"].label}
            </label>
            <Autocomplete
              getItemValue={item => item.id}
              items={this.state.hazardFlasherOptions}
              inputProps={{
                className: "form-control",
                name: FIELDS.ASSETS["Hazard Flasher"].fieldId,
                placeholder: "Type to search..."
              }}
              wrapperStyle={{ display: "block" }}
              menuStyle={{
                borderRadius: "3px",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                background: "rgba(255, 255, 255, 0.9)",
                padding: "2px 0",
                fontSize: "120%",
                position: "fixed",
                overflow: "auto",
                zIndex: "999",
                maxHeight: "50%"
              }}
              renderItem={(item, isHighlighted) => (
                <div
                  key={item.id}
                  style={{
                    background: isHighlighted ? "lightgray" : "white",
                    padding: "2px 5px"
                  }}
                >
                  {item.identifier}
                </div>
              )}
              shouldItemRender={(item, value) =>
                item.identifier.toLowerCase().indexOf(value.toLowerCase()) > -1
              }
              value={this.state.hazardFlasherName}
              onChange={e =>
                this.setState({ hazardFlasherName: e.target.value })
              }
              onSelect={(value, item) => {
                let formData = this.props.formData;
                formData[FIELDS.ASSETS["Hazard Flasher"].fieldId] = value;
                this.setState({
                  formData,
                  hazardFlasherName: item.identifier
                });
              }}
            />
          </div>
        )}

        {/* Autocomplete for DMS */}
        {this.props.formData[FIELDS.ASSET_TYPE] ===
          "Digital Messaging Sign (DMS)" && (
          <div className="form-group">
            <label
              htmlFor={FIELDS.ASSETS["Digital Messaging Sign (DMS)"].fieldId}
            >
              {FIELDS.ASSETS["Digital Messaging Sign (DMS)"].label}
            </label>
            <Autocomplete
              getItemValue={item => item.id}
              items={this.state.dmsOptions}
              inputProps={{
                className: "form-control",
                name: FIELDS.ASSETS["Digital Messaging Sign (DMS)"].fieldId,
                placeholder: "Type to search..."
              }}
              wrapperStyle={{ display: "block" }}
              menuStyle={{
                borderRadius: "3px",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                background: "rgba(255, 255, 255, 0.9)",
                padding: "2px 0",
                fontSize: "120%",
                position: "fixed",
                overflow: "auto",
                zIndex: "999",
                maxHeight: "50%"
              }}
              renderItem={(item, isHighlighted) => (
                <div
                  key={item.id}
                  style={{
                    background: isHighlighted ? "lightgray" : "white",
                    padding: "2px 5px"
                  }}
                >
                  {item.identifier}
                </div>
              )}
              shouldItemRender={(item, value) =>
                item.identifier.toLowerCase().indexOf(value.toLowerCase()) > -1
              }
              value={this.state.dmsName}
              onChange={e => this.setState({ dmsName: e.target.value })}
              onSelect={(value, item) => {
                let formData = this.props.formData;
                formData[
                  FIELDS.ASSETS["Digital Messaging Sign (DMS)"].fieldId
                ] = value;
                this.setState({
                  formData,
                  dmsName: item.identifier
                });
              }}
            />
          </div>
        )}

        {/* Autocomplete for Sensor */}
        {this.props.formData[FIELDS.ASSET_TYPE] === "Sensor" && (
          <div className="form-group">
            <label htmlFor={FIELDS.ASSETS["Sensor"].fieldId}>
              {FIELDS.ASSETS["Sensor"].label}
            </label>
            <Autocomplete
              getItemValue={item => item.id}
              items={this.state.sensorOptions}
              inputProps={{
                className: "form-control",
                name: FIELDS.ASSETS["Sensor"].fieldId,
                placeholder: "Type to search..."
              }}
              wrapperStyle={{ display: "block" }}
              menuStyle={{
                borderRadius: "3px",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                background: "rgba(255, 255, 255, 0.9)",
                padding: "2px 0",
                fontSize: "120%",
                position: "fixed",
                overflow: "auto",
                zIndex: "999",
                maxHeight: "50%"
              }}
              renderItem={(item, isHighlighted) => (
                <div
                  key={item.id}
                  style={{
                    background: isHighlighted ? "lightgray" : "white",
                    padding: "2px 5px"
                  }}
                >
                  {item.identifier}
                </div>
              )}
              shouldItemRender={(item, value) =>
                item.identifier.toLowerCase().indexOf(value.toLowerCase()) > -1
              }
              value={this.state.sensorName}
              onChange={e => this.setState({ sensorName: e.target.value })}
              onSelect={(value, item) => {
                let formData = this.props.formData;
                formData[FIELDS.ASSETS["Sensor"].fieldId] = value;
                this.setState({
                  formData,
                  sensorName: item.identifier
                });
              }}
            />
          </div>
        )}
      </>
    );
  }
}
