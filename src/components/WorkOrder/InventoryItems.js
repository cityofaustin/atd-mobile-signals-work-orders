import React, { Component } from "react";
import AddInventoryItemsFields from "./AddInventoryItemsFields";
import EditInventoryItemsFields from "./EditInventoryItemsFields";
import Header from "../Shared/Header";
import SubmitButton from "../Form/SubmitButton";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { FIELDS } from "./formConfig";
import { ErrorMessage, SuccessMessage } from "./Alerts";
import api from "../../queries/api";

class InventoryItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      isEditable: false,
      isSubmitting: false,
      isSubmitted: false,
      errors: [],
    };
  }
  componentDidMount() {
    // Render edit form if inventoryItemId exists
    this.props.isEditing && this.setState({ isEditable: true });
  }

  handleInventoryItemChange = (fieldId, selected) => {
    console.log(fieldId, selected);
    let item = selected ? selected.value : "";

    // Add item to exisiting formData and update state
    const formData = { ...this.state.formData, [fieldId]: item };
    this.setState({ formData });
  };

  handleItemPropertyChange = data => {
    // Add Item Condition to existing formData and update state
    const formData = { ...this.state.formData, ...data };
    this.setState({ formData });
  };

  renderInventoryFormVerb = () => (this.state.isEditable ? "Edit" : "Add");

  submitForm = e => {
    e.preventDefault();
    const formData = {
      ...this.state.formData,
      [FIELDS.WORK_ORDER_ID_FOR_INVENTORY]: this.props.workOrderId,
    };
    console.log(formData);
    this.setState({ isSubmitting: true });

    const inventoryItemId = this.props.itemSelectedforEdit;
    // Define submit options
    const postRecord = () => api.workOrder().submitInventoryItem(formData);
    const putRecord = () =>
      api.workOrder().submitEditInventory(inventoryItemId, formData);

    // Define whether to POST new record or PUT record edit
    const inventorySubmitRequest = this.state.isEditable
      ? putRecord
      : postRecord;

    inventorySubmitRequest()
      .then(res => {
        // If editing, clear itemSelectedforEdit, switch isEditingInventoryItem to restore table view, and refetch inventory
        this.state.isEditable && this.props.completeInventoryItemEdit();

        this.setState({ isSubmitting: false, isSubmitted: true });
      })
      .catch(error => {
        console.log(error.response.data.errors);

        this.setState({
          errors: error.response.data.errors,
          isSubmitting: false,
        });
      });
  };

  render() {
    return (
      <div>
        <Header
          icon={faWrench}
          title={`${this.renderInventoryFormVerb()} Inventory Item`}
        />

        {this.state.isSubmitted &&
          (this.state.isEditable ? (
            <SuccessMessage formType="Inventory Item" formVerb="edite" />
          ) : (
            <SuccessMessage formType="Inventory Item" formVerb="adde" />
          ))}

        {this.state.errors &&
          this.state.errors.map(error => (
            <ErrorMessage error={error} key={error.field} />
          ))}

        <form onSubmit={this.submitForm.bind(this)}>
          {!this.state.isEditable && (
            <AddInventoryItemsFields
              handleInventoryItemChange={this.handleInventoryItemChange}
              handleItemPropertyChange={this.handleItemPropertyChange}
            />
          )}
          {this.state.isEditable && (
            <EditInventoryItemsFields
              handleInventoryItemChange={this.handleInventoryItemChange}
              handleItemPropertyChange={this.handleItemPropertyChange}
              inventoryItemId={this.props.itemSelectedforEdit}
            />
          )}
          <SubmitButton
            text={`${this.renderInventoryFormVerb()} Item`}
            isSubmitting={this.state.isSubmitting}
          />
        </form>
      </div>
    );
  }
}

export default InventoryItems;
