import { symptoms } from "@/lib/symptoms";
import { getSuggestion } from "@/utils/get-suggestions";
import { useState } from "react";
import styled from "styled-components";

const SearchBox = styled.div`
  margin-inline: 40px;
`;

const StyledFilterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default function FilterForm() {
  const [symptomSearch, setSymptomSearch] = useState("");
  const [symptomSearchMatching, setSymptomSearchMatching] = useState([]);

  function handleSymptomsSearchChange(event) {
    const userInput = event.target.value;
    setSymptomSearch(userInput);
    getSuggestion(userInput, symptoms, setSymptomSearchMatching);
  }

  function handleSymptomSelection(symptom) {
    setSymptomSearch(symptom);
    setSymptomSearchMatching([]);
  }

  return (
    <SearchBox>
      <h2>Search Recipes</h2>
      <StyledFilterForm>
        <label htmlFor="symptom">Select a Symptom </label>
        <input
          placeholder="Type your symptom and select from the list"
          type="text"
          id="symptom"
          value={symptomSearch}
          onChange={handleSymptomsSearchChange}
        />
        {symptomSearchMatching.length > 0 && (
          <select
            onChange={(event) => handleSymptomSelection(event.target.value)}
          >
            {symptomSearchMatching.map((symptom, index) => (
              <option key={index} value={symptom}>
                {symptom}
              </option>
            ))}
          </select>
        )}
        <label htmlFor="ingredient">Select an ingredient </label>
        <input type="text" id="ingredient" />
        <button>Search</button>
      </StyledFilterForm>
    </SearchBox>
  );
}
