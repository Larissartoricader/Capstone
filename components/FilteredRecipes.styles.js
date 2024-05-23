//Search

import styled from "styled-components";

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-inline: 10px;
  gap: 10px;
`;

export const SearchBox = styled.div`
  border-radius: 10px;
  position: relative;
`;

export const StyledFilterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const StyledInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.3s;
  &:focus {
    border-color: #8fc379;
  }
  &::placeholder {
    color: #999;
    font-size: 12px;
  }
  &::before {
    content: "";
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    background-size: cover;
    pointer-events: none;
  }
`;

//Suggestion
export const StyledSuggestionsList = styled.div`
  background-color: white;
  border-radius: 10px;
  position: absolute;
  top: 38px;
  right: 2px;
  width: 80%;
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
`;

export const StyledTextSuggestion = styled.p`
  color: black;
  font-size: medium;
  display: block;
`;

//Selected Suggestion

export const StyledSelectedSuggestionBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const StyledSelectedSuggestion = styled.div`
  background-color: #f1efe2;
  font-size: small;
  padding: 5px;
  border-radius: 10px;
  display: block;
`;

export const StyledCross = styled.button`
  color: green;
  cursor: pointer;
  border: none;
`;

export const ResetButton = styled.button`
  max-width: 60px;
  border: none;
  background-color: #ffc107;
  color: white;
  border-radius: 10px;
  padding: 5px 10px;
`;

export const FilterHeadline = styled.h1`
  font-family: var(--headline-font);
  font-size: 200%;
`;