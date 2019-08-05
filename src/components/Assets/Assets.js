import React, { Component } from "react";
import Autocomplete from "react-autocomplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faSpinner,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

import api from "../../queries/api";
import AssetDetailsSection from "./AssetDetailsSection";
import AssetTable from "./AssetTable";
import AssetMap from "./AssetMap";
import { FIELDS } from "./formConfig";
import { getAllAssets } from "../WorkOrder/helpers";

class Assets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assetsData: [],
      assetOptions: [],
      loading: false,
      location: "",
      typedAsset: "",
      selectedAsset: "",
      assetDetailsData: "",
      assetServiceRequestsData: "",
      assetDetectorsData: "",
      assetPreventativeMaintenanceData: "",
      assetWorkOrdersData: "",
      assetMapData: "",
      assetCamerasData: "",
    };

    this.renderItem = (item, isHighlighted) => (
      <div
        key={item.id}
        style={{
          background: isHighlighted ? "lightgray" : "white",
          padding: "2px 5px",
        }}
      >
        {item.identifier}
      </div>
    );

    this.shouldItemRender = (item, value) =>
      item.identifier.toLowerCase().indexOf(value.toLowerCase()) > -1;

    this.inputProps = field => {
      return {
        className: "form-control",
        name: "asset",
        placeholder: "Type to search...",
      };
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    getAllAssets().then(data => {
      this.setState({
        assetOptions: data.signalOptions,
        loading: false, // Keep naming of options from imported helper
      });
    });
  }

  handleChange = event => {
    this.setState({
      location: event.target.value,
    });
  };

  handleAutocompleteChange = e => {
    e.persist();
    this.setState({ typedAsset: e.target.value });
  };

  onAssetSelect = (value, item) => {
    api
      .assets()
      .workOrders(item.id)
      .then(res => this.setState({ assetWorkOrdersData: res.data.records }));
    api
      .assets()
      .serviceRequests(item.id)
      .then(res =>
        this.setState({ assetServiceRequestsData: res.data.records })
      );
    api
      .assets()
      .details(item.id)
      .then(res => this.setState({ assetDetailsData: res.data }));
    api
      .assets()
      .cameras(item.id)
      .then(res => this.setState({ assetCamerasData: res.data.records }));
    api
      .assets()
      .preventativeMaint(item.id)
      .then(res =>
        this.setState({ assetPreventativeMaintenanceData: res.data.records })
      );
    api
      .assets()
      .map(item.id)
      .then(res => this.setState({ assetMapData: res.data }));
    api
      .assets()
      .detectors(item.id)
      .then(res => this.setState({ assetDetectorsData: res.data.records }));
    this.setState({
      selectedAsset: item.identifier,
      typedAsset: item.identifier,
    });
  };

  clearAssetSearch = () => {
    this.setState({ selectedAsset: "", typedAsset: "" });
  };

  render() {
    return (
      <div>
        <h1>
          <FontAwesomeIcon icon={faMapMarkerAlt} /> Assets
        </h1>

        {this.state.assetOptions.length > 0 && (
          <form>
            <div className="form-group">
              <label htmlFor={"asset"}>{"Search Assets"}</label>
              <br />
              <Autocomplete
                getItemValue={item => item.id}
                items={this.state.assetOptions}
                inputProps={this.inputProps("asset")}
                wrapperStyle={this.wrapperStyle}
                menuStyle={this.menuStyle}
                renderItem={(item, isHighlighted) =>
                  this.renderItem(item, isHighlighted)
                }
                shouldItemRender={(item, value) =>
                  this.shouldItemRender(item, value)
                }
                value={this.state.typedAsset}
                onChange={this.handleAutocompleteChange}
                onSelect={(value, item) => this.onAssetSelect(value, item)}
              />
            </div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.clearAssetSearch}
            >
              Clear
            </button>
          </form>
        )}

        {this.state.loading ? (
          <FontAwesomeIcon icon={faSpinner} size="2x" className="atd-spinner" />
        ) : (
          ""
        )}
        <br />
        {this.state.selectedAsset !== "" && (
          <>
            <AssetMap data={this.state.assetMapData} />
            <Accordion>
              <AccordionItem>
                <AccordionItemTitle>
                  <h3 className="u-position-relative">
                    <FontAwesomeIcon icon={faInfoCircle} /> Asset Details
                    <div className="accordion__arrow" role="presentation" />
                  </h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                  {Object.keys(FIELDS.ASSETS_DETAILS).map((section, i) => (
                    <AssetDetailsSection
                      key={i}
                      sectionName={section}
                      data={this.state.assetDetailsData}
                      fields={FIELDS.ASSETS_DETAILS}
                    />
                  ))}
                </AccordionItemBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemTitle>
                  <h3 className="u-position-relative">
                    <FontAwesomeIcon icon={faInfoCircle} /> Cameras
                    <div className="accordion__arrow" role="presentation" />
                  </h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <AssetTable
                    data={this.state.assetCamerasData}
                    fields={FIELDS.ASSETS_CAMERAS}
                  />
                </AccordionItemBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemTitle>
                  <h3 className="u-position-relative">
                    <FontAwesomeIcon icon={faInfoCircle} /> Service Requests
                    <div className="accordion__arrow" role="presentation" />
                  </h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <AssetTable
                    data={this.state.assetServiceRequestsData}
                    fields={FIELDS.ASSETS_SERVICE_REQUESTS}
                  />
                </AccordionItemBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemTitle>
                  <h3 className="u-position-relative">
                    <FontAwesomeIcon icon={faInfoCircle} /> Work Orders
                    <div className="accordion__arrow" role="presentation" />
                  </h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <AssetTable
                    data={this.state.assetWorkOrdersData}
                    fields={FIELDS.ASSETS_WORK_ORDERS}
                  />
                </AccordionItemBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemTitle>
                  <h3 className="u-position-relative">
                    <FontAwesomeIcon icon={faInfoCircle} /> Preventative
                    Maintenance
                    <div className="accordion__arrow" role="presentation" />
                  </h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <AssetTable
                    data={this.state.assetPreventativeMaintenanceData}
                    fields={FIELDS.ASSETS_PREVENTATIVE_MAINTENANCE}
                  />
                </AccordionItemBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemTitle>
                  <h3 className="u-position-relative">
                    <FontAwesomeIcon icon={faInfoCircle} /> Detectors
                    <div className="accordion__arrow" role="presentation" />
                  </h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <AssetTable
                    data={this.state.assetDetectorsData}
                    fields={FIELDS.ASSETS_DETECTORS}
                  />
                </AccordionItemBody>
              </AccordionItem>
            </Accordion>
          </>
        )}
      </div>
    );
  }
}

export default Assets;
