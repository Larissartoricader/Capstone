import { useState } from "react";
import RecipeList from "../RecipeList";
import { SearchBox, SearchfieldAndDropDown, Searchfield, FakeDropDown, DropDownOption, Selection, ResetButton, Wrapper, SelectedSuggestion, SelectedSuggestionText, SelectedSuggestionCross } from "./FilteredRecipes.styles";


export default function FilteredRecipes({
  recipes,
  bookmarkedRecipesIDs,
  onToggleBookmark,
}) {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [symptomSuggestions, setSymptomSuggestions] = useState([]);

  function handleSymptomsChange(event) {
    const userInput = event.target.value;
    setSymptomSuggestions([]);
    const suggestions = recipes.reduce((acc, recipe) => {
      const matchingSymptoms = recipe.symptoms.filter((symptom) =>
        symptom.toLowerCase().startsWith(userInput.toLowerCase())
      );
      return [...acc, ...matchingSymptoms];
    }, []);
    const notYetSelectedSuggestions = suggestions.filter(
      (suggestion) => !selectedSymptoms.includes(suggestion)
    );
    setSymptomSuggestions(Array.from(new Set(notYetSelectedSuggestions)));
  }

  function handleSymptomSuggestionClick(suggestion) {
    setSelectedSymptoms((prevSelectedSymptoms) => [
      ...prevSelectedSymptoms,
      suggestion,
    ]);
    setSymptomSuggestions([]);
    setUserInput("");
  }

  function removeSelectedSymptom(index) {
    setSelectedSymptoms((prevSelectedSymptoms) => {
      const updatedSymptoms = [...prevSelectedSymptoms];
      updatedSymptoms.splice(index, 1);
      return updatedSymptoms;
    });
  }

  function filterRecipes() {
    let filteredRecipes = [...recipes];
    if (selectedSymptoms.length > 0) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        selectedSymptoms.every((symptom) => recipe.symptoms.includes(symptom))
      );
    }
    return filteredRecipes;
  }

  const filteredRecipes = filterRecipes();

  function handleSearchSubmit(event) {
    event.preventDefault();
    event.target.reset();
  }

  const [userInput, setUserInput] = useState("");

  function handleResetSubmit(event) {
    event.preventDefault();
    setSelectedSymptoms([]);
    setUserInput("");
  }

  return (
    <Wrapper>
      <SearchBox>
        <SearchfieldAndDropDown onSubmit={handleSearchSubmit}>
          <Searchfield
            placeholder="Search for symptoms"
            type="text"
            id="symptom"
            name="inputfield"
            onChange={(event) => {
              handleSymptomsChange(event);
              setUserInput(event.target.value);
            }}
            value={userInput}
          />
           {userInput &&<FakeDropDown>
             { symptomSuggestions.map((suggestion) => (
                <DropDownOption
                  key={suggestion}
                  onClick={() => handleSymptomSuggestionClick(suggestion)}
                >
                  {suggestion}
                </DropDownOption>
              ))}
          </FakeDropDown>}

        </SearchfieldAndDropDown>
        <ResetButton onClick={handleResetSubmit}>Reset</ResetButton>
        </SearchBox>
        <Selection>
            {selectedSymptoms.map((symptom) => (
              <SelectedSuggestion key={symptom}>
                <SelectedSuggestionText>
                {symptom}{" "}
                </SelectedSuggestionText>
                <SelectedSuggestionCross onClick={() => removeSelectedSymptom(symptom)}>
                  ✖️
                </SelectedSuggestionCross>
              </SelectedSuggestion>
            ))}
          </Selection>
      <RecipeList
        bookmarkedRecipesIDs={bookmarkedRecipesIDs}
        recipes={filteredRecipes}
        onToggleBookmark={onToggleBookmark}
      />
    </Wrapper>
  );
}
