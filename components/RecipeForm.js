import { ingredients } from "@/lib/ingredients";
import { symptoms } from "@/lib/symptoms";
import { useState } from "react";
import styled from "styled-components";
import { getSuggestion } from "@/utils/get-suggestions";
import { useRouter } from "next/router";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-left: 10px;
`;

export default function RecipeForm({ onAddRecipe }) {
  const router = useRouter();

  // PT.1: ON CHANGE
  const [ingredientSuggestion, setIngredientSuggestion] = useState();
  const [symptomSuggestion, setSymptomSuggestion] = useState();

  function handleIngredientsChange(event) {
    const userInput = event.target.value;
    getSuggestion(userInput, ingredients, setIngredientSuggestion);
  }

  function handleSymptomsChange(event) {
    const userInput = event.target.value;
    getSuggestion(userInput, symptoms, setSymptomSuggestion);
  }

  // PT.2: Display user's choices below input field (before submitting)
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  function selectSuggestedIngredient() {
    selectedIngredients.includes(ingredientSuggestion) ||
      setSelectedIngredients([...selectedIngredients, ingredientSuggestion]);
  }
  // TODO: Die suggestion sollte danach wieder verschwinden. Man kann aber hier nicht zwei Setter callen. (+ analog bei symptoms) könnte man die suggestion an einer weiteren stelle zwischenspeichern und das dann hier nutzen?

  function selectUserIngredient(event) {
    if (
      event.key === "Enter" &&
      !selectedIngredients.includes(event.target.value)
    ) {
      setSelectedIngredients([...selectedIngredients, event.target.value]);
    }
  }

  function deleteSelectedIngredient(ingredientToBeDeleted) {
    setSelectedIngredients(
      selectedIngredients.filter(
        (ingredient) => ingredient !== ingredientToBeDeleted
      )
    );
  }

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  function selectSuggestedSymptom() {
    selectedSymptoms.includes(symptomSuggestion) ||
      setSelectedSymptoms([...selectedSymptoms, symptomSuggestion]);
  }

  function selectUserSymptom(event) {
    if (
      event.key === "Enter" &&
      !selectedSymptoms.includes(event.target.value)
    ) {
      setSelectedSymptoms([...selectedSymptoms, event.target.value]);
    }
  }

  function deleteSelectedSymptom(symptomToBeDeleted) {
    setSelectedSymptoms(
      selectedSymptoms.filter((symptom) => symptom !== symptomToBeDeleted)
    );
  }

  // PT.3: Submitting the form input
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userRecipe = Object.fromEntries(formData);
    userRecipe.ingredients = [...selectedIngredients, userRecipe.ingredients];
    userRecipe.symptoms = [...selectedSymptoms, userRecipe.symptoms];
    onAddRecipe(userRecipe);
    event.target.reset();
    router.push("/");
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
          onChange={handleIngredientsChange}
          onKeyPress={selectUserIngredient}
        ></input>
        {ingredientSuggestion && (
          <div
            style={{
              cursor: "pointer",
            }}
            onClick={selectSuggestedIngredient}
          >
            Suggestion: {ingredientSuggestion}
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
                onClick={() => deleteSelectedIngredient(ingredient)}
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
          onChange={handleSymptomsChange}
          onKeyPress={selectUserSymptom}
        ></input>
        {symptomSuggestion && (
          <div
            style={{
              cursor: "pointer",
            }}
            onClick={selectSuggestedSymptom}
          >
            Suggestion: {symptomSuggestion}
          </div>
        )}
        <ul>
          {selectedSymptoms.map((symptom) => (
            <li key={symptom}>
              <p>{symptom}</p>
              <p
                style={{
                  cursor: "pointer",
                }}
                onClick={() => deleteSelectedSymptom(symptom)}
              >
                ❌
              </p>
            </li>
          ))}
        </ul>

        <button type="submit">Submit</button>
      </StyledForm>
    </>
  );
}
