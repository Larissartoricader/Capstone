import styled from "styled-components";

export const SearchSectionAndRecipeListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 95%;
  padding-inline: 2.5%;
`;

export const SearchBoxAndSelectionWrapper = styled.div`
width: 100%;  
display: flex; flex-direction: column; gap: 1rem;
text-align: left;`;


export const SearchBox = styled.div`
width: 100%;
max-width: 500px;
display: flex;
align-items: top;
gap: 5px;
border-radius: var(--small-box-border-radius);`;

export const SearchfieldAndDropDown = styled.div`
width: 80%; 
margin-right: 22px;`
// styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 5px;
// `;


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

export const ResetButton = styled.button`
  max-width: 60px;
  height: 40px;
  padding: 10px;
  margin-right: 0;
  border: none;
  background-color: var(--primary-button-and-header-color);
  color: white;
  border-radius: var(--small-box-border-radius);`;


export const FakeDropDown = styled.div`
padding-inline: 10px; 
  border: var(--general-border);
  border-radius: 0 0 8px 8px;
  background-color: var(--box-background-color);
  width: 100%;
  z-index: 1;
  /* top: 38px;
  right: 2px; */
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto; */
  `

export const StyledTextSuggestion = styled.p`
  color: var(--font-color);
  font-size: medium;
  display: block;
`;

export const DropDownOption = styled.button`
  background-color: var(--box-background-color);
  text-align: left;
  border: none;
  font-size: var(--label-font-size); 
  font-family: var(--label-font);
  width: 100%;
`;

export const Selection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const StyledSelectedSuggestion = styled.div`
  background-color: var( --selected-value-color);
  font-size: small;
  padding: 5px;
  border-radius: var(--small-box-border-radius);
  display: block;
`;

export const StyledCross = styled.button`
background-color: var( --symptom-color);
  cursor: pointer;
  border: none;
`;

