import styled from "react-emotion";

const StyledHeader = styled("header")`
  display: flex;
  justify-content: space-between;
  align-items: center;

  align-self: flex-start;
  background-color: ${props => props.theme.colorWhite};
  margin: 0;
  height: 66px;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.colorBlack};
  a {
    color: ${({ theme }) => theme.colorBlack};
    cursor: pointer;
    font-size: 24px;
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
