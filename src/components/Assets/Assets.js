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
import { workOrderFields } from "../../queries/fields";
import { FIELDS } from "./formConfig";
import { signalsWorkOrderStatuses } from "../../constants/statuses";
import { getAllAssets } from "../WorkOrder/helpers";

const fields = workOrderFields.baseFields;
const statuses = signalsWorkOrderStatuses;

class Assets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assetsData: [],
      assetOptions: [],
      loading: false,
      location: "",
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

  handleSearch = event => {
    event.preventDefault();
    this.setState({ allWorkOrdersData: [], loading: true });
    api
      .allWorkOrders()
      .searchAll(this.state.location, 1)
      .then(res => {
        this.setState({
          allWorkOrdersData: res.data.records,
          loading: false,
          lastPage: res.data.total_pages,
          currentPage: 1,
        });
      });
  };

  updatePage = pageNumber => {
    this.setState({
      allWorkOrdersData: [],
      loading: true,
      currentPage: pageNumber,
    });
    api
      .allWorkOrders()
      .searchAll(this.state.location, pageNumber)
      .then(res => {
        this.setState({
          allWorkOrdersData: res.data.records,
          lastPage: res.data.total_pages,
          loading: false,
        });
      });
    window.scrollTo(0, 0);
  };

  prevPage = event => {
    event.preventDefault();
    // if currentPage !== 1, API call for prev page
    if (this.state.currentPage !== 1) {
      const prevPage = this.state.currentPage - 1;
      this.updatePage(prevPage);
    }
  };

  nextPage = event => {
    event.preventDefault();
    // if currentPage === lastPage, nothing, else API call for next page
    if (this.state.currentPage !== this.state.lastPage) {
      const nextPage = this.state.currentPage + 1;
      this.updatePage(nextPage);
    }
  };

  handleAutocompleteChange = (assetTypeString, e) => {
    e.persist();
    let data = this.state.updatedFormData;

    this.setState({ [assetTypeString]: e.target.value, updatedFormData: data });
  };

  onAssetSelect = (value, item) => {
    // TODO move API calls to separate methods and pass in props to view components
    console.log(value, item);
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
    this.setState({ selectedAsset: item.identifier });
  };

  render() {
    return (
      <div>
        <h1>
          <FontAwesomeIcon icon={faMapMarkerAlt} /> Assets
        </h1>

        {this.state.assetOptions.length > 0 && (
          <form onSubmit={this.handleSearch}>
            <div className="form-group">
              <label htmlFor={"asset"}>{"Search Assets"}</label>
              <br />
              <Autocomplete
                getItemValue={item => item.id}
                items={this.state.assetOptions}
                inputProps={this.inputProps("Type to search...")}
                wrapperStyle={this.wrapperStyle}
                menuStyle={this.menuStyle}
                renderItem={(item, isHighlighted) =>
                  this.renderItem(item, isHighlighted)
                }
                shouldItemRender={(item, value) =>
                  this.shouldItemRender(item, value)
                }
                value={this.state.selectedAsset}
                onChange={this.handleAutocompleteChange.bind(this, "signal")}
                onSelect={(value, item) => this.onAssetSelect(value, item)}
              />
            </div>
            <input type="submit" value="Search" className="btn btn-primary" />
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
