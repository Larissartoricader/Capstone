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

export default function FilterForm({ recipes }) {
  const [filteredRecipes, setFilteredRecipes] = useState([]);

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
    console.log(userSymptom);
    const userIngredient = formData.get("ingredient");
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
        />
        <label htmlFor="ingredient">Select an ingredient </label>
        <input type="text" id="ingredient" name="ingredient" />
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
