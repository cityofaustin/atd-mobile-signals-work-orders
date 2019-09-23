import styled from "react-emotion";

// The bottom padding here is related to the body padding-bottom
// in App.css to stack sticky FormFooter and NavFooter components
const StyledFooter = styled("div")`
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 5px 0 70px 0;
  background-color: #e6e6e6;
  width: 100%;
  box-shadow: 0px 0px 13px #212529;

  @media screen and (max-height: 500px) {
    visibility: hidden;
  }
`;

export default StyledFooter;
