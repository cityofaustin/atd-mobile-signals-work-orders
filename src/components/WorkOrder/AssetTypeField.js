import React, { Component } from "react";
import Autocomplete from "react-autocomplete";
import _ from "lodash";

import api from "../../queries/api";
import { FIELDS, ASSET_TYPE_OPTIONS } from "./formConfig";
import { getAllAssets } from "./helpers";

export default class AssetTypeField extends Component {
  constructor(props) {
    super(props);

    this.setInitalAssetName = field => {
      const fieldArray = this.props.formData[
        `${FIELDS.ASSETS[field].fieldId}_raw`
      ];
      const hasValue = fieldArray.length > 0;

      if (hasValue) {
        return fieldArray[0].identifier;
      } else {
        return "";
      }
    };

    this.state = {
      signalOptions: [],
      schoolBeaconOptions: [],
      cameraOptions: [],
      hazardFlasherOptions: [],
      dmsOptions: [],
      sensorOptions: [],
      signal: this.setInitalAssetName("signal"),
      camera: this.setInitalAssetName("camera"),
      schoolBeacon: this.setInitalAssetName("schoolBeacon"),
      hazardFlasher: this.setInitalAssetName("hazardFlasher"),
      dms: this.setInitalAssetName("dms"),
      sensor: this.setInitalAssetName("sensor")
    };

    this.menuStyle = {
      borderRadius: "3px",
      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
      background: "rgba(255, 255, 255, 0.9)",
      padding: "2px 0",
      fontSize: "120%",
      position: "fixed",
      overflow: "auto",
      zIndex: "999",
      maxHeight: "50%"
    };

    this.renderItem = (item, isHighlighted) => (
      <div
        key={item.id}
        style={{
          background: isHighlighted ? "lightgray" : "white",
          padding: "2px 5px"
        }}
      >
        {item.identifier}
      </div>
    );

    this.wrapperStyle = { display: "block" };

    this.shouldItemRender = (item, value) =>
      item.identifier.toLowerCase().indexOf(value.toLowerCase()) > -1;

    this.inputProps = field => {
      return {
        className: "form-control",
        name: FIELDS.ASSETS[field].fieldId,
        placeholder: "Type to search..."
      };
    };
  }

  componentDidMount() {
    // It might not be ideal UX for us to wait for all 6 assets type options to return
    // before providing any options to the user. Perhaps it would be better if we first
    // queried the current asset type (ex: signals), set those options to state,
    // and then query the rest. 🤔
    getAllAssets().then(data => {
      this.setState({
        signalOptions: data.signalOptions,
        schoolBeaconOptions: data.schoolBeaconOptions,
        cameraOptions: data.cameraOptions,
        hazardFlasherOptions: data.hazardFlasherOptions,
        dmsOptions: data.dmsOptions,
        sensorOptions: data.sensorOptions
      });
    });
  }

  handleChange = (assetTypeString, e) => {
    e.persist();
    let formData = this.props.formData;
    let fieldId = FIELDS.ASSETS[assetTypeString].fieldId;
    formData[fieldId] = e.target.value;
    formData[`${fieldId}_raw`] = [];
    this.props.handleAssetChange(formData);
    this.setState({ [assetTypeString]: e.target.value });
  };

  onSelect = (value, item, field) => {
    let formData = this.props.formData;
    formData[FIELDS.ASSETS[field].fieldId] = value;
    formData[`${FIELDS.ASSETS[field].fieldId}_raw`].id = item.id;
    formData[`${FIELDS.ASSETS[field].fieldId}_raw`].identifier =
      item.identifier;
    this.setState({ [field]: item.identifier });
    this.props.handleAssetChange(formData);
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
            <label htmlFor={FIELDS.ASSETS.signal.fieldId}>
              {FIELDS.ASSETS.signal.label}
            </label>
            <Autocomplete
              getItemValue={item => item.id}
              items={this.state.signalOptions}
              inputProps={this.inputProps("signal")}
              wrapperStyle={this.wrapperStyle}
              menuStyle={this.menuStyle}
              renderItem={(item, isHighlighted) =>
                this.renderItem(item, isHighlighted)
              }
              shouldItemRender={(item, value) =>
                this.shouldItemRender(item, value)
              }
              value={this.state.signal}
              onChange={this.handleChange.bind(this, "signal")}
              onSelect={(value, item) => this.onSelect(value, item, "signal")}
            />
          </div>
        )}

        {/* Autocomplete for Cameras */}
        {this.props.formData[FIELDS.ASSET_TYPE] === "Camera" && (
          <div className="form-group">
            <label htmlFor={FIELDS.ASSETS.camera.fieldId}>
              {FIELDS.ASSETS.camera.label}
            </label>
            <Autocomplete
              getItemValue={item => item.id}
              items={this.state.cameraOptions}
              inputProps={this.inputProps("camera")}
              wrapperStyle={this.wrapperStyle}
              menuStyle={this.menuStyle}
              renderItem={(item, isHighlighted) =>
                this.renderItem(item, isHighlighted)
              }
              shouldItemRender={(item, value) =>
                this.shouldItemRender(item, value)
              }
              value={this.state.camera}
              onChange={this.handleChange.bind(this, "camera")}
              onSelect={(value, item) => this.onSelect(value, item, "camera")}
            />
          </div>
        )}

        {/* Autocomplete for School Zones */}
        {this.props.formData[FIELDS.ASSET_TYPE] === "School Beacon" && (
          <div className="form-group">
            <label htmlFor={FIELDS.ASSETS.schoolBeacon.fieldId}>
              {FIELDS.ASSETS.schoolBeacon.label}
            </label>
            <Autocomplete
              getItemValue={item => item.id}
              items={this.state.schoolBeaconOptions}
              inputProps={this.inputProps("schoolBeacon")}
              wrapperStyle={this.wrapperStyle}
              menuStyle={this.menuStyle}
              renderItem={(item, isHighlighted) =>
                this.renderItem(item, isHighlighted)
              }
              shouldItemRender={(item, value) =>
                this.shouldItemRender(item, value)
              }
              value={this.state.schoolBeacon}
              onChange={this.handleChange.bind(this, "schoolBeacon")}
              onSelect={(value, item) =>
                this.onSelect(value, item, "schoolBeacon")
              }
            />
          </div>
        )}

        {/* Autocomplete for Hazard Flasher */}
        {this.props.formData[FIELDS.ASSET_TYPE] === "Hazard Flasher" && (
          <div className="form-group">
            <label htmlFor={FIELDS.ASSETS.hazardFlasher.fieldId}>
              {FIELDS.ASSETS.hazardFlasher.label}
            </label>
            <Autocomplete
              getItemValue={item => item.id}
              items={this.state.hazardFlasherOptions}
              inputProps={this.inputProps("hazardFlasher")}
              wrapperStyle={this.wrapperStyle}
              menuStyle={this.menuStyle}
              renderItem={(item, isHighlighted) =>
                this.renderItem(item, isHighlighted)
              }
              shouldItemRender={(item, value) =>
                this.shouldItemRender(item, value)
              }
              value={this.state.hazardFlasher}
              onChange={this.handleChange.bind(this, "hazardFlasher")}
              onSelect={(value, item) =>
                this.onSelect(value, item, "hazardFlasher")
              }
            />
          </div>
        )}

        {/* Autocomplete for DMS */}
        {this.props.formData[FIELDS.ASSET_TYPE] ===
          "Digital Messaging Sign (DMS)" && (
          <div className="form-group">
            <label htmlFor={FIELDS.ASSETS.dms.fieldId}>
              {FIELDS.ASSETS.dms.label}
            </label>
            <Autocomplete
              getItemValue={item => item.id}
              items={this.state.dmsOptions}
              inputProps={this.inputProps("dms")}
              wrapperStyle={this.wrapperStyle}
              menuStyle={this.menuStyle}
              renderItem={(item, isHighlighted) =>
                this.renderItem(item, isHighlighted)
              }
              shouldItemRender={(item, value) =>
                this.shouldItemRender(item, value)
              }
              value={this.state.dms}
              onChange={this.handleChange.bind(this, "dms")}
              onSelect={(value, item) => this.onSelect(value, item, "dms")}
            />
          </div>
        )}

        {/* Autocomplete for Sensor */}
        {this.props.formData[FIELDS.ASSET_TYPE] === "Sensor" && (
          <div className="form-group">
            <label htmlFor={FIELDS.ASSETS.sensor.fieldId}>
              {FIELDS.ASSETS.sensor.label}
            </label>
            <Autocomplete
              getItemValue={item => item.id}
              items={this.state.sensorOptions}
              inputProps={this.inputProps("sensor")}
              wrapperStyle={this.wrapperStyle}
              menuStyle={this.menuStyle}
              renderItem={(item, isHighlighted) =>
                this.renderItem(item, isHighlighted)
              }
              shouldItemRender={(item, value) =>
                this.shouldItemRender(item, value)
              }
              value={this.state.sensor}
              onChange={this.handleChange.bind(this, "sensor")}
              onSelect={(value, item) => this.onSelect(value, item, "sensor")}
            />
          </div>
        )}
      </>
    );
  }
}
