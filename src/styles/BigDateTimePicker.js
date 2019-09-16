import styled from "react-emotion";
import { colors } from "../constants/colors";

export const BigDateTimePicker = styled("div")`
  /* Time picker styles */
  .react-datepicker__time-container {
    width: 120px;
  }

  .react-datepicker__time-box {
    width: 120px !important;
  }

  .react-datepicker__time-list {
    width: 120px;
  }

  .react-datepicker__time-list-item {
    height: 40px !important;
    line-height: 30px !important;
    font-size: 1rem !important;
  }

  .react-datepicker__time-list-item--selected {
    background-color: ${colors.primary} !important;
  }

  /* Date picker styles */
  .react-datepicker__day--selected {
    background-color: ${colors.primary} !important;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: ${colors.primary} !important;
  }
`;
