import React, { Component } from 'react';
import AddInventoryItemsFields from './AddInventoryItemsFields';
import Header from '../Shared/Header';
import SubmitButton from '../Form/SubmitButton';
import { faWrench } from '@fortawesome/free-solid-svg-icons';

class InventoryItems extends Component {
  componentDidMount() {
    console.log('In componentDidMount');
  }

  submitForm = e => {
    e.preventDefault();
    console.log(e);
  };

  render() {
    return (
      <div>
        <Header icon={faWrench} title="Add Inventory Items" />
        <form onSubmit={this.submitForm}>
          <AddInventoryItemsFields />
          <SubmitButton isSubmitting={false} />
        </form>
      </div>
    );
  }
}

export default InventoryItems;
