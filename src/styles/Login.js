import { css } from 'react-emotion';

export const pageStyles = css`
  min-width: 320px;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const formStyles = css`
  display: grid;
  grid-template-columns: min-content;
  grid-template-rows: min-content 40px min-content 40px 40px;
`;

export const buttonStyles = css`
  margin-top: 20px;
  height: 40px;
  background-color: #2196F3;
  border: none;
  border-radius: 2px;
  color: #fff;
`;

export const labelStyles = css`
  margin-top: .5rem;
`;

export const inputStyles = css`
  border: none;
  width: 250px;
  background-color: rgba(238, 238, 238, .6);
  border-bottom: 1.5px solid rgba(0, 0, 0, .38);
  border-radius: 2px 2px 0 0;
  padding: 0 10px;
  &:focus {
    border-bottom: 1px solid #2196F3;
    &::placeholder {
      opacity: 0;
    }
  }

`;