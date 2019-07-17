import React, { Component } from 'react';
import AddInventoryItemsFields from './AddInventoryItemsFields';
import Header from '../Shared/Header';
import SubmitButton from '../Form/SubmitButton';
import { faWrench } from '@fortawesome/free-solid-svg-icons';

class InventoryItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      isSubmitting: false,
    };
  }
  componentDidMount() {
    console.log('In componentDidMount');
  }

  handleInventoryItemChange = (item, field) => {
    console.log(item, field);
  };

  handleItemConditionChange = (condition, field) => {
    console.log(condition, field);
  };

  submitForm = e => {
    e.preventDefault();
    console.log(e);
  };

  render() {
    return (
      <div>
        <Header icon={faWrench} title="Add Inventory Items" />
        <form onSubmit={this.submitForm}>
          <AddInventoryItemsFields
            handleInventoryItemChange={this.handleInventoryItemChange}
            handleItemConditionChange={this.handleItemConditionChange}
          />
          <SubmitButton isSubmitting={this.state.isSubmitting} />
        </form>
      </div>
    );
  }
}

export default InventoryItems;
