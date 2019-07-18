import React, { Component } from 'react';
import AddInventoryItemsFields from './AddInventoryItemsFields';
import Header from '../Shared/Header';
import SubmitButton from '../Form/SubmitButton';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { FIELDS } from './formConfig';
import api from '../../queries/api';

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

  handleItemPropertyChange = data => {
    // Add Item Condition to existing formData and update state
    const formData = { ...this.state.formData, ...data };
    this.setState({ formData });
  };

  submitForm = e => {
    e.preventDefault();
    const formData = {
      ...this.state.formData,
      [FIELDS.WORK_ORDER_ID_FOR_INVENTORY]: this.props.match.params.workOrderId,
    };
    console.log(formData);
    this.setState({ isSubmitting: true });
    api
      .workOrder()
      .submitInventoryItem(formData)
      .then(res => {
        console.log(res);
        this.setState({ isSubmitting: false });
      });
  };

  render() {
    return (
      <div>
        <Header icon={faWrench} title="Add Inventory Items" />
        <form onSubmit={this.submitForm.bind(this)}>
          <AddInventoryItemsFields
            handleInventoryItemChange={this.handleInventoryItemChange}
            handleItemPropertyChange={this.handleItemPropertyChange}
          />
          <SubmitButton
            text="Add Item"
            isSubmitting={this.state.isSubmitting}
          />
        </form>
      </div>
    );
  }
}

export default InventoryItems;
