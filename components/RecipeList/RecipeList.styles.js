import styled from "styled-components";

export const StyledList = styled.div`
  list-style: none;
  display: grid;
  column-gap: 30px;
  row-gap: 20px;
  grid-template-columns: 1fr;
  @media only screen and (min-width: 580px) {
    grid-template-columns: 1fr 1fr;
  }
  @media only screen and (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  top: 100px;
  left: 5%;
`;

export const WhiteSpaceBottom = styled.div`
  height: 20vh;
`;