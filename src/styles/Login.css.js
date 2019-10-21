import { css } from "react-emotion";

const colorBlue = "#2196F3";
const colorWhite = "#fff";
const inputBackgroundColor = "rgba(238, 238, 238, .6)";
const inputBorderColor = "rgba(0, 0, 0, .38)";

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
  display: flex;
  height: 300px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const buttonStyles = css`
  margin-top: 20px;
  height: 60px;
  width: 140px;
  background-color: ${colorBlue};
  border: none;
  border-radius: 2px;
  color: ${colorWhite};
  &:hover {
    cursor: pointer;
  }
`;

export const errorMessageStyles = css`
  height: 20px;
  color: red;
`;
export const labelStyles = css`
  margin-top: 0.5rem;
  align-self: flex-start;
`;

export const inputStyles = css`
  border: none;
  width: 250px;
  background-color: ${inputBackgroundColor};
  border-bottom: 1.5px solid ${inputBorderColor};
  border-radius: 2px 2px 0 0;
  padding: 0 10px;
  &:focus {
    border-bottom: 1px solid ${colorBlue};
    &::placeholder {
      opacity: 0;
    }
  }
`;
