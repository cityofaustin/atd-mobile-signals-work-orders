import styled from "react-emotion";
import { colors } from "../constants/colors";

export const WorkOrderInventoryStatus = styled("div")`
  .submitted > .col-2 {
    background-color: ${colors.inventoryStatusSubmitted};
  }

  .issued > .col-2 {
    background-color: ${colors.inventoryStatusIssued};
  }

  .returned > .col-2 {
    background-color: ${colors.inventoryStatusReturned};
  }
`;
