import React, { Component } from 'react';
import Select from 'react-select';

import { INVENTORY_ITEMS_CONDITION_OPTIONS, FIELDS } from './formConfig';
import api from '../../queries/api';

export default class AddInventoryItemsFields extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemOptions: [],
    };
  }

  componentDidMount() {
    this.getItemOptions();
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
        this.setState({ itemOptions });
      });
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
            defaultValue={''}
            isClearable
            isSearchable
            name={FIELDS.WORK_ORDER_INVENTORY_ITEMS}
            options={this.state.itemOptions}
            //   onChange={this.props.handleSupportTechniciansFieldChange.bind(
            //     this,
            //     FIELDS.SUPPORT_TECHNICIANS
            //   )}
          />
        </div>
        <div className="form-group">
          <label htmlFor={FIELDS.WORK_ORDER_CONDITION}>Condition</label>
          <select
            className="form-control"
            id={FIELDS.WORK_ORDER_CONDITION}
            name={FIELDS.WORK_ORDER_CONDITION}
            defaultValue={''}
          >
            {INVENTORY_ITEMS_CONDITION_OPTIONS.map(option => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
            {/*    onChange={this.props.handleSupportTechniciansFieldChange.bind(
                 this,
                 FIELDS.SUPPORT_TECHNICIANS
               )} */}
          </select>
        </div>
      </>
    );
  }
}
