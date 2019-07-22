import styled from "react-emotion";

// The bottom padding here is related to the body padding-bottom in App.css to stack sticky FormFooter and App Navigation Footer
const StyledFooter = styled("div")`
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: red;
  width: 100%;
  z-index: 10;
`;

export default StyledFooter;
