import React, { Component } from "react";
import Select from "react-select";

import { INVENTORY_ITEMS_CONDITION_OPTIONS, FIELDS } from "./formConfig";
import api from "../../queries/api";

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
          <label htmlFor={FIELDS.WORK_ORDER_ITEM_CONDITION}>Condition</label>
          <select
            className="form-control"
            id={FIELDS.WORK_ORDER_ITEM_CONDITION}
            name={FIELDS.WORK_ORDER_ITEM_CONDITION}
            onChange={this.handleConditionChange}
            defaultValue={"DEFAULT"}
            required // Prevent blank item from adding to DB since Knack does not require these fields
          >
            <option value="DEFAULT" disabled>
              Select...
            </option>
            {INVENTORY_ITEMS_CONDITION_OPTIONS.map(option => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
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
      </>
    );
  }
}
