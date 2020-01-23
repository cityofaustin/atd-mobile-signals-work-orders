import React, { Component } from "react";
import Select from "react-select";

import { FIELDS } from "./formConfig";
import api from "../../queries/api";
import { getWorkTypeScheduledWorkOptions } from "../../queries/knackObjectHelpers";

export default class AddInventoryItemsFields extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      itemOptions: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getItemOptions();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getItemOptions = () => {
    api
      .workOrder()
      .getInventoryItems()
      .then(res => {
        console.log(res);
        const itemOptions = res.data.records.map(item => {
          return { label: item.identifier, value: item.id };
        });
        this._isMounted && this.setState({ itemOptions });
      });
  };

  handleConditionChange = e => {
    let data = {};
    data[FIELDS.WORK_ORDER_ITEM_CONDITION] = e.target.value;
    this.props.handleItemPropertyChange(data);
  };

  handleQuantityChange = e => {
    let data = {};
    data[FIELDS.WORK_ORDER_ITEM_QUANTITY] = e.target.value;
    this.props.handleItemPropertyChange(data);
  };

  handleSourceChange = option => {
    let data = {};
    data[FIELDS.WORK_ORDER_ITEM_SOURCE] = option.value;
    this.props.handleItemPropertyChange(data);
  };

  handleCommentChange = e => {
    let data = {};
    data[FIELDS.WORK_ORDER_ITEM_COMMENT] = e.target.value;
    this.props.handleItemPropertyChange(data);
  };

  render() {
    return (
      <>
        <div className="form-group">
          <label htmlFor={FIELDS.WORK_ORDER_INVENTORY_ITEMS}>
            Inventory Item
          </label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={""}
            isClearable
            isSearchable
            name={FIELDS.WORK_ORDER_INVENTORY_ITEMS}
            options={this.state.itemOptions}
            onChange={this.props.handleInventoryItemChange.bind(
              this,
              FIELDS.WORK_ORDER_INVENTORY_ITEMS
            )}
            required // Prevent blank item from adding to DB since Knack does not require these fields
          />
        </div>
        <div className="form-group">
          <label htmlFor={FIELDS.WORK_ORDER_ITEM_QUANTITY}>Quantity</label>
          <input
            className="form-control"
            id={FIELDS.WORK_ORDER_ITEM_QUANTITY}
            name={FIELDS.WORK_ORDER_ITEM_QUANTITY}
            type="number"
            onChange={this.handleQuantityChange}
            required // Prevent blank item from adding to DB since Knack does not require these fields
          />
        </div>
        <div className="form-group">
          <label htmlFor={FIELDS.WORK_ORDER_ITEM_SOURCE}>Source</label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={""}
            id={FIELDS.WORK_ORDER_ITEM_SOURCE}
            name={FIELDS.WORK_ORDER_ITEM_SOURCE}
            options={getWorkTypeScheduledWorkOptions([
              "Warehouse Inventory",
              "Working Stock",
              "Truck Stock",
              "Other",
            ])}
            onChange={this.handleSourceChange}
            required // Prevent blank item from adding to DB since Knack does not require these fields
          />
        </div>
        <div className="form-group">
          <label htmlFor={FIELDS.WORK_ORDER_ITEM_COMMENT}>Comment</label>
          <textarea
            className="form-control"
            id={FIELDS.WORK_ORDER_ITEM_COMMENT}
            name={FIELDS.WORK_ORDER_ITEM_COMMENT}
            rows="2"
            onChange={this.handleCommentChange}
          />
        </div>
      </>
    );
  }
}
