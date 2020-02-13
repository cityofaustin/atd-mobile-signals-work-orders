import styled from "react-emotion";
import { colors } from "../constants/colors";

export const WorkOrderInventoryStatus = styled("div")`
  .inventory-item {
    font-size: 1.125rem;
  }

  .badge-wrapper {
    font-size: 1.3rem;
  }

  .status-badge {
    color: ${colors.black};
    padding: 0.75em;
    background-color: ${colors.white};
    border: 1px solid ${colors.black};
  }

  .submitted {
    background-color: ${colors.inventoryStatusSubmitted};
    border: 0px;
  }

  .issued {
    background-color: ${colors.inventoryStatusIssued};
    border: 0px;
  }

  .returned {
    background-color: ${colors.inventoryStatusReturned};
    border: 0px;
  }
`;
