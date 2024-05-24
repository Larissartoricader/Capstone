import styled from "styled-components";

// 1. Ebene
export const Wrapper = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  gap: 1rem;
  /* width: 80%; */
  padding-inline: 2.5%;
display: grid;
  grid-template-rows: auto 1fr;
  width: 95%;
`;

// 2. Ebene
export const SearchBox = styled.div`
left: 5%;
width: 100%;
max-width: 500px;
display: flex;
align-items: top;
flex-direction: row;
gap: 1rem;
text-align: left;
border-radius: var(--small-box-border-radius);`;

// 3. Ebene
export const SearchfieldAndDropDown = styled.div`
width: 80%; 
margin-right: 22px;`;

// 4. Ebene
export const Searchfield = styled.input`
width: 100%;
height: 20px;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: var(--small-box-border-radius);
  outline: none;
  transition: border-color 0.3s;
  &:focus {
    border-color: #8fc379;
  }
  &::placeholder {
    color: #999;
    font-size: 16px;
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

// 3. Ebene
export const ResetButton = styled.button`
  max-width: 60px;
  height: 40px;
  padding: 10px;
  margin-right: 0;
  border: none;
  background-color: var(--primary-button-and-header-color);
  color: white;
  border-radius: var(--small-box-border-radius);`;

// 3. Ebene
export const FakeDropDown = styled.div`
  border: var(--general-border);
  border-radius: 0 0 8px 8px;
  background-color: var(--box-background-color);
  padding-inline: 8px; 
  width: 100%;
  overflow-y: auto;
  `
  
// 4. Ebene
export const DropDownOption = styled.button`
padding-block: 5px;
background-color: var(--box-background-color);
color: var(--font-color);
  font-size: medium;
  display: block;
  text-align: left;
  border: none;
  width: 100%;
`;

// 2. Ebene
export const Selection = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const SelectedSuggestion = styled.div`
  background-color: var( --selected-value-color);
  font-size: small;
  padding: 5px 5px 5px 10px;
  margin: 0;
  height: 20px;
  border-radius: var(--small-box-border-radius);
  display: flex;
  justify-content: row;
  align-items: center;
`;

export const SelectedSuggestionCross = styled.button`
background-color: var(--selected-value-color);
  /* cursor: pointer; */
  border: none;`;

  export const SelectedSuggestionText = styled.p`font-size: 16px;`;