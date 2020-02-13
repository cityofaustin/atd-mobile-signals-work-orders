import styled from "react-emotion";

const StyledHeader = styled("header")`
  background-color: ${props => props.theme.colorWhite};
  border-bottom: 1px solid ${props => props.theme.colorBlack};
  margin-bottom: 10px;

  a {
    color: ${({ theme }) => theme.colorBlack};
    cursor: pointer;
    font-size: 24px;
  }

  .nav-buttons {
    cursor: pointer;
    margin-left: 10px;
    margin-right: 10px;
  }

  /* Turn Bootstrap button into circle and disable dropdown arrow icon */
  .btn-circle {
    width: 50px;
    height: 50px;
    padding: 6px 0px;
    border-radius: 25px;
    text-align: center;
    font-size: 20px;
    color: white;
    line-height: 1.42857;
    background-color: #007bff;
  }

  .dropdown-toggle::after {
    display: none;
  }
`;

export default StyledHeader;
