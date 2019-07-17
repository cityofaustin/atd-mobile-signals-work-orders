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
    // TODO mirror handling of Lead Technician in AssignTechnicianFields.js & Edit.js
    console.log(fieldId, selected);
  };

  handleItemConditionChange = (condition, field) => {
    // TODO mirror handling of Asset in AssetTypeField.js & Edit.js
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
