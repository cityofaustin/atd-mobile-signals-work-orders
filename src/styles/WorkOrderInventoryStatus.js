import styled from "react-emotion";
import { colors } from "../constants/colors";

export const WorkOrderInventoryStatus = styled("div")`
  .submitted > .col > li {
    background-color: ${colors.inventoryStatusSubmitted};
  }

  .issued > .col > li {
    background-color: ${colors.inventoryStatusIssued};
  }

  .returned > .col > li {
    background-color: ${colors.inventoryStatusReturned};
  }
`;
