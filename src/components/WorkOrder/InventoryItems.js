import React, { Component } from 'react';
import AddInventoryItemsFields from './AddInventoryItemsFields';

class InventoryItems extends Component {
  componentDidMount() {
    console.log('In componentDidMount');
  }
  render() {
    return (
      <div>
        Hello world!
        <AddInventoryItemsFields />
      </div>
    );
  }
}

export default InventoryItems;
