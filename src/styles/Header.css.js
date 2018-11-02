import styled from 'react-emotion';

const StyledHeader = styled('header')`
  display: flex;
  justify-content: space-between;
  align-items: center;

  align-self: flex-start;
  background-color: ${props => props.theme.colorWhite};
  margin: 0;
  height: 44px;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.colorBlack};
  a {
    color: ${({ theme }) => theme.colorBlack};
    cursor: pointer;
    font-size: 24px;
  }
  button {
    height: 40px;
    padding: 0 10px;
    border: none;
    color: ${({ theme }) => theme.colorBlack};
    background-color: ${props => props.theme.colorWhite};
    border-radius: 2px;
    cursor: pointer;
  }
`;

export default StyledHeader;