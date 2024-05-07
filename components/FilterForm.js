import { capitalizeFirstLetter } from "@/utils/filter-suggestions";
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

export default function FilterForm({ recipes }) {
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [symptomsInput, setSymptomsInput] = useState("");
  const [ingredientInput, setIngredientInput] = useState("");

  function handleSymptomsChange(event) {
    const userInput = event.target.value;
    setSymptomsInput(userInput || "");
  }

  function handleIngredientChange(event) {
    const userInput = event.target.value;
    setIngredientInput(userInput || "");
  }

  function filterRecipes(symptom, ingredient) {
    let filteredRecipes = recipes;

    if (symptom) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        recipe.symptoms.includes(symptom)
      );
    }

    if (ingredient) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        recipe.ingredients.includes(ingredient)
      );
    }

    return filteredRecipes;
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userSymptom = formData.get("symptom");

    const userIngredient = formData.get("ingredient");
    console.log(userSymptom);

    console.log(userIngredient);
    const filtered = filterRecipes(userSymptom, userIngredient);
    setFilteredRecipes(filtered);
  }

  return (
    <SearchBox>
      <h2>Search Recipes</h2>
      <StyledFilterForm onSubmit={handleSearchSubmit}>
        <label htmlFor="symptom">Select a Symptom </label>
        <input
          placeholder="Type your symptom and select from the list"
          type="text"
          id="symptom"
          name="symptom"
          onChange={handleSymptomsChange}
        />
        <div>{symptomsInput && <p>Symptom: {symptomsInput}</p>}</div>

        <label htmlFor="ingredient">Select an ingredient </label>
        <input
          type="text"
          id="ingredient"
          name="ingredient"
          onChange={handleIngredientChange}
        />
        <div>{ingredientInput && <p>Ingredient: {ingredientInput}</p>}</div>

        <button>Search</button>
      </StyledFilterForm>
      {filteredRecipes.length > 0 ? (
        <div>
          <h3>The Perfect Recipes for you</h3>
          <ul>
            {filteredRecipes.map((recipe) => (
              <li key={recipe.index}>{recipe.title}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No recipes found. Try different search criteria.</p>
      )}
    </SearchBox>
  );
}
