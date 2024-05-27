import styled from "styled-components";

export const Button = styled.button`
  background: transparent;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
`;
export const TipOfTheDayWrapper = styled.div`
  position: fixed;
  z-index: 1;
  bottom: 100px;
  display: flex;
  flex-direction: column;
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  opacity: 0.4;
  z-index: 1;
`;