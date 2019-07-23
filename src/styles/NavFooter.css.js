import styled from "react-emotion";
import { css } from "react-emotion";

// The bottom padding here is related to the body padding-bottom in App.css to stack sticky FormFooter and App Navigation Footer
export const StyledNavFooter = styled("div")`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 2;
`;

export const StyledNavFooterButtons = css`
  border: #e5e5e5 solid 1px;
  line-height: 50%;
  overflow: visible;
  background-color: #f4f4f4;
`;
