import React, { Component } from "react";
import AssetTable from "./AssetTable";
import AssetMap from "./AssetMap";
import AssetDetailsSection from "./AssetDetailsSection";
import { FIELDS } from "./fieldConfig";
import {
  getFirstHalfAssetDetails,
  getSecondHalfAssetDetails,
  formatDataTitles,
} from "./helpers";
import api from "../../queries/api";

import Autocomplete from "react-autocomplete";
import changeCase from "change-case";
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

class Assets extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      pageHeading: "Search Signals",
      assetsData: [],
      assetOptions: [],
      loading: false,
      location: "",
      typedAsset: "",
      selectedAsset: "",
      viewedAsset: "",
      assetDetailsData: "",
      assetServiceRequestsData: "",
      assetDetectionData: "",
      assetPreventativeMaintenanceData: "",
      assetFileAttachmentsData: "",
      assetWorkOrdersData: "",
      assetMapData: "",
      assetCamerasData: "",
      assetSignalPriorityData: "",
      assetPoleAttachmentsData: "",
      assetTravelSensorData: "",
      assetApsButtonRequestsData: "",
      assetCadStatusData: "",
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
      maxHeight: "50%",
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
    window.analytics.page("Search Signals");

    this._isMounted = true;
    if (this.props.match.params.assetId) {
      const viewAsset = { id: this.props.match.params.assetId };
      this.setState({ viewedAsset: viewAsset, pageHeading: "Signal Details" });
      this.onAssetSelect("", viewAsset);
    }
    this.setState({ loading: true });
    api
      .workOrder()
      .signals()
      .then(res => {
        this._isMounted &&
          this.setState({
            assetOptions: res.data.records,
            loading: false,
          });
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleAutocompleteChange = e => {
    e.persist();
    this.setState({ typedAsset: e.target.value });
  };

  onAssetSelect = (value, item) => {
    this.setState({ loading: true });
    // Knack limits API reqs to 10 per second
    getFirstHalfAssetDetails(item).then(data => {
      this.setState({
        assetWorkOrdersData: data.workOrdersResponse.data.records,
        assetServiceRequestsData: data.serviceRequestsResponse.data.records,
        assetDetailsData: data.detailsResponse.data,
        assetCamerasData: data.camerasResponse.data.records,
        assetPreventativeMaintenanceData:
          data.preventativeMaintResponse.data.records,
        assetMapData: data.mapResponse.data,
        assetFileAttachmentsData: data.fileAttachmentsResponse.data.records,
      });
    });
    setTimeout(
      () =>
        getSecondHalfAssetDetails(item)
          .then(data => {
            this.setState({
              assetDetectionData: data.detectorsResponse.data.records,
              assetSignalPriorityData: data.signalPriorityResponse.data.records,
              assetPoleAttachmentsData:
                data.poleAttachmentsResponse.data.records,
              assetTravelSensorData: data.travelSensorResponse.data.records,
              assetApsButtonRequestsData:
                data.apsButtonRequestsResponse.data.records,
              assetCadStatusData: data.cadStatusResponse.data,
            });
          })
          .then(() => {
            this.setState({
              selectedAsset: item.identifier,
              typedAsset: item.identifier,
              loading: false,
            });
          }),
      1100
    );
  };

  clearAssetSearch = () => {
    this.setState({ selectedAsset: "", typedAsset: "" });
  };

  render() {
    return (
      <div>
        <h1>
          <FontAwesomeIcon icon={faMapMarkerAlt} /> {this.state.pageHeading}
        </h1>

        {this.state.assetOptions.length > 0 &&
          this.state.viewedAsset === "" && (
            <form>
              <div className="form-group">
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
                <button
                  type="button"
                  className="btn btn-danger ml-2 btn-lg"
                  onClick={this.clearAssetSearch}
                >
                  Clear
                </button>
              </div>
            </form>
          )}

        {this.state.loading && (
          <FontAwesomeIcon icon={faSpinner} size="2x" className="atd-spinner" />
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
              {FIELDS.TABLES.map((table, i) => {
                const tableKey = Object.keys(table)[0];
                const stateName = `asset${changeCase.pascalCase(tableKey)}Data`;
                const title = formatDataTitles(changeCase.titleCase(tableKey));
                const recordsTotal = this.state[stateName]
                  ? this.state[stateName].length
                  : 0;
                return (
                  <AccordionItem key={i}>
                    <AccordionItemTitle>
                      <h3 className="u-position-relative">
                        <FontAwesomeIcon icon={faInfoCircle} /> {title}
                        <span className="badge badge-secondary float-right mr-5">
                          {recordsTotal}
                        </span>
                        <div className="accordion__arrow" role="presentation" />
                      </h3>
                    </AccordionItemTitle>
                    <AccordionItemBody>
                      <AssetTable
                        data={this.state[stateName]}
                        fields={table[tableKey]}
                        assetId={this.state.assetDetailsData.id}
                        title={title}
                      />
                    </AccordionItemBody>
                  </AccordionItem>
                );
              })}

              <AccordionItem>
                <AccordionItemTitle>
                  <h3 className="u-position-relative">
                    <FontAwesomeIcon icon={faInfoCircle} /> CAD Status
                    <div className="accordion__arrow" role="presentation" />
                  </h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <AssetDetailsSection
                    sectionName={"cadStatus"}
                    data={this.state.assetCadStatusData}
                    fields={FIELDS.CAD}
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
