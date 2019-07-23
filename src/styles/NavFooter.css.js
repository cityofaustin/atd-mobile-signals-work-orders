import styled from "react-emotion";

// The bottom padding here is related to the body padding-bottom in App.css to stack sticky FormFooter and App Navigation Footer
const StyledFooter = styled("div")`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 2;
`;

export default StyledFooter;
