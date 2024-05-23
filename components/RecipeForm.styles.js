import styled from "styled-components";
import { Circles } from "react-loader-spinner";

export const LoadingSpinner = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 999;
`;


export const FormHeadline = styled.h2`
  text-align: center;
  font-family: var(--general-font);
font-size: 200%; color: var(--font-color);`

export const StyledForm = styled.form`
  border: var(--general-border);
  border-radius: var(--big-box-border-radius);
  font-size: 100%; 
font-family: var(--general-font);
  color: var(--font-color);
  background-color: var(--secondary-background-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  margin: 0 auto;
  width: 90%;
  ` 

export const ErrorMessage = styled.div`
  color: red;
  padding: 7px;  
  width: 80%;
`;

export const InputFieldLabel = styled.label`
font-weight: bold;
padding: 20px 10px 10px 10px;
width: 80%;
text-align: left;`

export const TitleInputField = styled.input`
border: var(--general-border);
border-radius: var( --small-box-border-radius);
font-size: var(--input-field-font-size); 
font-family: var(--general-font); 
padding: 10px; 
width: 80%;`

export const BiggerFormField = styled.textarea`border: var(--general-border); border-radius: 12px; font-size: var(--input-field-font-size); font-family: var(--general-font); 
padding: 10px; 
height: 15vh;
width: 80%;`


export const ContainerOfInputFieldAndDropDown = styled.div`width: 80%; 
margin-right: 22px;`

export const IngredientsSymptomsInputField = styled.input`
border: var(--general-border);
padding: 10px; 
font-size: var(--label-font-size); 
font-family: var(--general-font); 
width: 100%;
border-radius: 8px;`

export const FakeDropDown = styled.div`
padding: 10px; 
  border: var(--general-border);
  border-radius: 0 0 8px 8px;
  background-color: var(--box-background-color);
  width: 100%;
  z-index: 1;
`;

export const DropDownOption = styled.button`
  background-color: var(--box-background-color);
  text-align: left;
  border: none;
  font-size: var(--label-font-size); 
  font-family: var(--label-font);
  width: 100%;
`;


export const Selection = styled.ul`
display: flex; 
flex-wrap: wrap; gap: 7px;
list-style: none; width: 80%;
margin: 10px 22px 10px 0; 
padding: 0;`

export const SelectedValue = styled.li`
display: inline-block;
gap: 2%;
  border: var(--general-border);
  border-radius: var( --small-box-border-radius);
  background-color: lightgrey;
  width: auto;
  padding: 0 2vw; 
  margin: 0 0;
  font-size: var(--input-field-font-size); font-family: var(--label-font);
`;

export const SelectedValueText = styled.p`display: inline-block; 
margin: 0; 
padding: 0;`

export const SelectedValueButton = styled.button`border: none; display: inline-block; 
padding: 0 0 0 5px;
background-color: lightgrey;`


export const ButtonContainer = styled.div`display: flex; justify-content: space-around; width: 80%; 
display: grid;
grid-template-columns: 1fr 1fr;
gap: 1rem;
padding: 30px 0 20px 0;
`

export const SubmitButton = styled.button`
background-color: #ffc107;
color: white; border: none;
border-radius: var(--small-box-border-radius); 
height: 6vh;
font-family: var(--general-font); font-size: var(--label-font-size);
font-weight: bold;
&:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }`
export const CancelButton = styled.button`
background-color: #ff0000; 
color: white;
border: none;
border-radius: var(--small-box-border-radius); 
height: 6vh;
font-family: var(--general-font); font-size: var(--label-font-size); font-weight: bold;&:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  `

export const WhiteSpace = styled.div`
  height: 20vh;
`;