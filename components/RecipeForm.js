import { ingredients } from "@/lib/ingredients";
import { render } from "@testing-library/react";
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
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userRecipe = Object.fromEntries(formData);
    // TODO: Get ingredients from selected ingredients array
    userRecipe.ingredients = userRecipe.ingredients.split(",");
    userRecipe.symptoms = userRecipe.symptoms.split(",");
    onAddNewRecipe(userRecipe);
    // TODO: Empty selected ingredients array
    // TODO: Update Ingredients Array with the new ones//
    event.target.reset();
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  function handleIngredientsChange(event) {
    const userInput = event.target.value;

    const userInputLowerCase = userInput.toLowerCase();

    const ingredientsLowerCase = ingredients.map((ingredient) =>
      ingredient.toLowerCase()
    );
    if (userInputLowerCase.length > 0) {
      const ingredientMatchingUserInput = ingredientsLowerCase.find(
        (ingredient) => ingredient.startsWith(userInputLowerCase)
      );
      const ingredientWithFirstLetterUpperCase = capitalizeFirstLetter(
        ingredientMatchingUserInput //We need a If here
      );
      setIngredientSuggestion(ingredientWithFirstLetterUpperCase);
    } else {
      setIngredientSuggestion(""); //ginger does not apper anymorec :D
    }
  }
  function handleClickIngredientSuggestion() {
    //When clicking the suggestion the choosen ingridient is rendered below
    selectedIngredients.includes(ingredientSuggestion) ||
      setSelectedIngredients([...selectedIngredients, ingredientSuggestion]);
  }

  function handleDeleteSelectedIngredient(ingredientToBeDeleted) {
    setSelectedIngredients(
      selectedIngredients.filter(
        (ingredient) => ingredient !== ingredientToBeDeleted
      )
    );
  }

  function renderUserIngredient(event) {
    selectedIngredients.includes(event.target.value) ||
      setSelectedIngredients([...selectedIngredients, event.target.value]);
  }

  console.log(selectedIngredients);
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
          onKeyPress={renderUserIngredient}
        ></input>
        {ingredientSuggestion && (
          <div
            style={{
              cursor: "pointer",
            }}
            onClick={handleClickIngredientSuggestion}
          >
            <div>Suggestion: {ingredientSuggestion}</div>
          </div>
        )}
        <ul>
          {selectedIngredients.map((ingredient) => (
            <li key={ingredient}>
              <p>{ingredient}</p>
              <p
                style={{
                  cursor: "pointer",
                }}
                onClick={() => handleDeleteSelectedIngredient(ingredient)}
              >
                ❌
              </p>
            </li>
          ))}
        </ul>
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