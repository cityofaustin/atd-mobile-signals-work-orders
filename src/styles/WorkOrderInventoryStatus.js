import styled from "react-emotion";
import { colors } from "../constants/colors";

export const WorkOrderInventoryStatus = styled("div")`
  .submitted > [class*="col"] {
    background-color: ${colors.inventoryStatusSubmitted};
  }

  .issued > [class*="col"] {
    background-color: ${colors.inventoryStatusIssued};
  }

  .returned > [class*="col"] {
    background-color: ${colors.inventoryStatusReturned};
  }
`;
