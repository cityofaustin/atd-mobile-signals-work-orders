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

  handleInventoryItemChange = (fieldId, selected) => {
    console.log(fieldId, selected);
    let item = selected ? selected.value : '';

    // Add item to exisiting formData and update state
    const formData = { ...this.state.formData, [fieldId]: item };
    this.setState({ formData });
  };

  handleItemConditionChange = data => {
    // Add Item Condition to existing formData and update state
    const formData = { ...this.state.formData, ...data };
    this.setState({ formData });
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
