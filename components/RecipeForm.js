import { ingredients } from "@/lib/ingredients";
import { useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-left: 10px;
`;

export default function RecipeForm({ onAddNewRecipe }) {
  const [ingredientSuggestion, setIngredientSuggestion] = useState();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userRecipe = Object.fromEntries(formData);
    userRecipe.ingredients = userRecipe.ingredients.split(",");
    userRecipe.symptoms = userRecipe.symptoms.split(",");
    onAddNewRecipe(userRecipe);
    //Update Ingredients Array with the new ones//
    event.target.reset();
  }
  function handleIngredientsChange(event) {
    const userInput = event.target.value;
    const userInputLowerCase = userInput.toLowerCase().trim();
    console.log(userInputLowerCase);
    const ingredientsLowerCase = ingredients.map((ingredient) =>
      ingredient.toLowerCase()
    );

    const ingredientMatchingUserInput = ingredients.find((ingredient) =>
      ingredient.startsWith(userInputLowerCase)
    );

    setIngredientSuggestion(ingredientMatchingUserInput);
    console.log(ingredientSuggestion);
  }

  return (
    <>
      <h2>Add your Recipe</h2>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="title">Title*</label>
        <input
          type="text"
          placeholder="What's the recipe's name?"
          min="4"
          max="50"
          id="title"
          name="title"
          required
        ></input>
        <label htmlFor="ingredients">Ingredients*</label>
        <input
          type="text"
          placeholder="Separate the ingredients by comma"
          min="4"
          max="100"
          id="ingredients"
          name="ingredients"
          defaultValue={ingredientSuggestion}
          onChange={handleIngredientsChange}
        ></input>
        <label htmlFor="preparation">Preparation</label>
        <input
          type="text"
          placeholder="e.g Add thyme to the water"
          min="4"
          max="300"
          required
          id="preparation"
          name="preparation"
        ></input>
        <label htmlFor="usage">Usage</label>
        <input
          type="text"
          placeholder="How to use it?"
          min="4"
          max="300"
          required
          id="usage"
          name="usage"
        ></input>
        <label htmlFor="symptoms">Symptoms</label>
        <input
          type="text"
          placeholder="min 2 Symptoms"
          required
          id="symptoms"
          name="symptoms"
        ></input>
        <button type="submit">Submit</button>
      </StyledForm>
    </>
  );
}
