import React, { Component } from 'react';
import AddInventoryItemsFields from './AddInventoryItemsFields';
import Header from '../Shared/Header';
import { faWrench } from '@fortawesome/free-solid-svg-icons';

class InventoryItems extends Component {
  componentDidMount() {
    console.log('In componentDidMount');
  }
  render() {
    return (
      <div>
        <Header icon={faWrench} title="Add Inventory Items" />
        <AddInventoryItemsFields />
      </div>
    );
  }
}

export default InventoryItems;
