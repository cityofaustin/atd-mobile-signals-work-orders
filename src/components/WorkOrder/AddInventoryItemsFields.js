import React, { Component } from 'react';
import Select from 'react-select';

import { INVENTORY_ITEMS_CONDITION_OPTIONS } from './formConfig';
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
    return <>Inventory Form</>;
  }
}
