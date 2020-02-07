import React, { Component } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { FIELDS } from "./formConfig";
import api from "../../queries/api";
import {
  getWorkTypeScheduledWorkOptions,
  convertKnackResponseObjectToSelectFormOption,
  convertKnackResponseStringToSelectFormOption,
} from "../../queries/knackObjectHelpers";

export default class EditInventoryItemsFields extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      itemOptions: [],
      existingFormData: null,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getItemOptions();
    this.getInventoryItemFields();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getInventoryItemFields = () => {
    api
      .workOrder()
      .getEditInventory(this.props.inventoryItemId)
      .then(res => {
        const inventoryItemData = res.data.records[0];
        this._isMounted &&
          this.setState({ existingFormData: inventoryItemData });
      });
  };

  getItemOptions = () => {
    api
      .workOrder()
      .getInventoryItems()
      .then(res => {
        const itemOptions = res.data.records.map(item => {
          return { label: item.identifier, value: item.id };
        });
        this._isMounted && this.setState({ itemOptions });
      });
  };

  handleSourceChange = option => {
    let data = {};
    data[FIELDS.WORK_ORDER_ITEM_SOURCE] = option.value;
    this.props.handleItemPropertyChange(data);
  };

  handleFieldChange = (e, field) => {
    let data = {};
    data[field] = e.target.value;
    this.props.handleItemPropertyChange(data);
  };

  render() {
    const { existingFormData } = this.state;
    return existingFormData ? (
      <>
        <div className="form-group">
          <label htmlFor={FIELDS.WORK_ORDER_INVENTORY_ITEMS}>
            Inventory Item
          </label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={convertKnackResponseObjectToSelectFormOption(
              existingFormData[FIELDS.WORK_ORDER_EDIT_INVENTORY_ITEM][0]
            )}
            isClearable
            isSearchable
            name={FIELDS.WORK_ORDER_INVENTORY_ITEMS}
            options={this.state.itemOptions}
            onChange={this.props.handleInventoryItemChange.bind(
              this,
              FIELDS.WORK_ORDER_INVENTORY_ITEMS
            )}
            required
          />{" "}
          // Prevent blank item from adding to DB since Knack does not require
          these fields
        </div>
        <div className="form-group">
          <label htmlFor={FIELDS.WORK_ORDER_ITEM_QUANTITY}>Quantity</label>
          <input
            className="form-control"
            id={FIELDS.WORK_ORDER_ITEM_QUANTITY}
            name={FIELDS.WORK_ORDER_ITEM_QUANTITY}
            type="number"
            defaultValue={existingFormData[FIELDS.WORK_ORDER_ITEM_QUANTITY]}
            onChange={e =>
              this.handleFieldChange(e, FIELDS.WORK_ORDER_ITEM_QUANTITY)
            }
            required
          />{" "}
          // Prevent blank item from adding to DB since Knack does not require
          these fields
        </div>
        <div className="form-group">
          <label htmlFor={FIELDS.WORK_ORDER_ITEM_SOURCE}>Source</label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            id={FIELDS.WORK_ORDER_ITEM_SOURCE}
            name={FIELDS.WORK_ORDER_ITEM_SOURCE}
            defaultValue={convertKnackResponseStringToSelectFormOption(
              existingFormData[FIELDS.WORK_ORDER_ITEM_SOURCE]
            )}
            options={getWorkTypeScheduledWorkOptions([
              "Warehouse Inventory",
              "Working Stock",
              "Truck Stock",
              "Other",
            ])}
            onChange={this.handleSourceChange}
            required
          />{" "}
          // Prevent blank item from adding to DB since Knack does not require
          these fields
        </div>
        <div className="form-group">
          <label htmlFor={FIELDS.WORK_ORDER_ITEM_COMMENT}>Comment</label>
          <textarea
            className="form-control"
            id={FIELDS.WORK_ORDER_ITEM_COMMENT}
            name={FIELDS.WORK_ORDER_ITEM_COMMENT}
            rows="2"
            defaultValue={existingFormData[FIELDS.WORK_ORDER_ITEM_COMMENT]}
            onChange={e =>
              this.handleFieldChange(e, FIELDS.WORK_ORDER_ITEM_COMMENT)
            }
          />
        </div>
      </>
    ) : (
      <FontAwesomeIcon
        icon={faSpinner}
        size="2x"
        className="atd-spinner--padded"
      />
    );
  }
}
