import React, { Component } from "react";
import { WorkOrderInventoryStatus } from "../../styles/WorkOrderInventoryStatus";
import { workOrderFields } from "../../queries/fields";
import api from "../../queries/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWrench,
  faTimesCircle,
  faCheck,
  faEdit,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../Form/Button";

class InventoryItemTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemSelectedforCancel: "",
      isCancelling: false,
    };
  }

  addWorkOrderStatusClass = status => {
    // Translate status to classname for CSS styling
    const statusClassname = status.split(" ")[0].toLowerCase() || null;
    return !!statusClassname ? statusClassname : "";
  };

  handleConfirmCancelItemClick = (e, inventoryItemId) => {
    // Show spinner while waiting for req to complete
    this.setState({ isCancelling: true });
    // Cancel item then remove selected item from state to show item details again
    const data = { id: inventoryItemId };
    api
      .workOrder()
      .cancelInventoryItem(inventoryItemId, data)
      .then(() => {
        this.setState({ itemSelectedforCancel: "", isCancelling: false });
        this.props.requestInventory(this.props.atdWorkOrderId);
      });
  };

  handleAddInventoryItemClick = e => {
    // Switch isAddingInventoryItem to show add form
    this.props.handleAddInventoryItem();
  };

  handleEditInventoryItemClick = (e, itemId) => {
    // Set itemId of edit and switch isEditingInventoryItem to show edit form
    this.props.handleEditInventoryItem(itemId);
  };

  render() {
    const { inventoryData, workOrderId } = this.props;
    return (
      <>
        <div className="p-3">
          <Button
            icon={faWrench}
            text={"New Item"}
            linkPath={`/work-order/inventory-items/${workOrderId}`}
            modifierClasses={""}
          />
        </div>
        {inventoryData.length === 0 && <p>No data</p>}
        {inventoryData.length > 0 && (
          <ul className="list-group list-group-flush">
            {inventoryData.map(
              (inventory, i) =>
                this.state.itemSelectedforCancel !== i ? (
                  <WorkOrderInventoryStatus
                    key={
                      i // If an item is selected to cancel, show yes/no confirmation. If not, show item details
                    }
                  >
                    <li
                      className={`list-group-item p-0 ${
                        this.addWorkOrderStatusClass(
                          inventory[workOrderFields.inventory.STATUS]
                        ) // Add classname to highlight item name by status
                      }`}
                      key={i}
                    >
                      <div
                        className={`row mx-0 ${this.addWorkOrderStatusClass(
                          inventory[workOrderFields.inventory.STATUS]
                        )}`}
                      >
                        <div className="col py-2 pr-0">
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                inventory[
                                  workOrderFields.inventory.INVENTORY_ITEM
                                ],
                            }}
                          />
                        </div>
                        <div className="col py-2 pr-2 d-flex justify-content-end">
                          <Button
                            icon={faEdit}
                            text={"Edit"}
                            linkPath={`/work-order/${workOrderId}/edit-inventory-item/${
                              inventory.id
                            }`}
                            color={"primary"}
                            modifierClasses={"mr-2"}
                          />

                          {/* Only show cancel button if status is not "Issued" and cancelled is false */}
                          <div className="col">
                            {inventory[workOrderFields.inventory.STATUS] !==
                              "Issued" &&
                              !inventory[
                                workOrderFields.inventory.CANCELLED
                              ] && (
                                <div
                                  className={`btn btn-danger btn-lg`}
                                  onClick={() =>
                                    this.setState({
                                      itemSelectedforCancel: i,
                                    })
                                  }
                                >
                                  <FontAwesomeIcon icon={faTimesCircle} />{" "}
                                  Cancel
                                </div>
                              )}
                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        {/* Add classname to highlight item attributes by status */}
                        <div
                          className={`row ${this.addWorkOrderStatusClass(
                            inventory[workOrderFields.inventory.STATUS]
                          )}`}
                        >
                          <div className="col-2">
                            <span>Quantity: </span>
                            {inventory[workOrderFields.inventory.QUANTITY]}
                          </div>
                          <div className="col-2">
                            <span>Source: </span>
                            {inventory[workOrderFields.inventory.SOURCE]}
                          </div>
                          <div className="col-2">
                            <span>Issued to: </span>
                            {inventory[workOrderFields.inventory.ISSUED_TO]}
                          </div>
                          <div className="col-2">
                            <span>Comment: </span>
                            {inventory[workOrderFields.inventory.COMMENT]}
                          </div>
                          <div className="col-2">
                            <span>Modified: </span>
                            {inventory[workOrderFields.inventory.MODIFIED]}
                          </div>
                          <div className="col-2">
                            <span>Status: </span>
                            {inventory[workOrderFields.inventory.STATUS]}
                          </div>
                        </div>
                      </div>
                    </li>
                  </WorkOrderInventoryStatus>
                ) : (
                  <li
                    className={`list-group-item d-flex row text-center`}
                    key={i}
                  >
                    <div className="col-12 pb-4 lead">
                      Are you sure you want to cancel this inventory request?
                    </div>
                    {this.state.isCancelling ? (
                      <FontAwesomeIcon
                        icon={faSpinner}
                        size="2x"
                        className="atd-spinner"
                      />
                    ) : (
                      <>
                        <div className="col-6">
                          <div
                            className={`btn btn-success btn-lg btn-block`}
                            onClick={e =>
                              this.handleConfirmCancelItemClick(e, inventory.id)
                            }
                          >
                            <FontAwesomeIcon icon={faCheck} /> Yes
                          </div>
                        </div>
                        <div className="col-6">
                          <div
                            className={`btn btn-danger btn-lg btn-block`}
                            onClick={() =>
                              this.setState({ itemSelectedforCancel: "" })
                            }
                          >
                            <FontAwesomeIcon icon={faTimesCircle} /> No
                          </div>
                        </div>
                      </>
                    )}
                  </li>
                )
            )}
          </ul>
        )}
        {!inventoryData && (
          <div>
            <FontAwesomeIcon
              icon={faSpinner}
              size="2x"
              className="atd-spinner"
            />
          </div>
        )}
      </>
    );
  }
}

export default InventoryItemTable;
