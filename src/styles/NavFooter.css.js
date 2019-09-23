import styled from "react-emotion";
import { css } from "react-emotion";

// The bottom padding here is related to the body padding-bottom
// in App.css to stack sticky FormFooter and NavFooter components
export const StyledNavFooter = styled("div")`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 2;

  @media screen and (max-height: 800px) {
    visibility: hidden;
  }
`;

export const StyledNavFooterButtons = css`
  border: #e5e5e5 solid 1px;
  background-color: #f4f4f4;
`;
