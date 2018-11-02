import styled from 'react-emotion';

const StyledHeader = styled('header')`
  display: flex;
  justify-content: space-between;
  align-items: center;

  align-self: flex-start;
  background-color: ${props => props.theme.colorWhite};
  padding: 0 15px;
  margin: 0;
  height: 44px;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.colorBlack};
  button {
    height: 40px;
    padding: 0 10px;
    border: none;
    background-color: ${props => props.theme.colorWhite};
    border-radius: 2px;
    cursor: pointer;
  }
`;

export default StyledHeader;