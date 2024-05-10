import { ingredients } from "@/lib/ingredients";
import { symptoms } from "@/lib/symptoms";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getSuggestion } from "@/utils/get-suggestions";
import { useRouter } from "next/router";

const StyledForm = styled.form`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  margin: 5px;
  padding: 25px;
`;

// TODO adjust width to width of input field
const DropDownOption = styled.button`
  width: 80vw;
`;

const ListItemSelectedValues = styled.li`
  display: flex;
  gap: 2vw;
  border: solid grey 2px;
  border-radius: 5px;
  width: auto;
  padding: 0 2vw;
`;

const ErrorMessage = styled.div`
  color: red;
  margin: 5px 0;
`;

const StyledHeadline = styled.h2`
  text-align: center;
`;

const WhiteSpace = styled.div`
  height: 20vh;
`;

export default function RecipeForm({
  onAddRecipe,
  onEditRecipe,
  recipeToEdit,
}) {
  const [ingredientSuggestion, setIngredientSuggestion] = useState();
  const [symptomSuggestion, setSymptomSuggestion] = useState();
  const [ingredientsInput, _setIngredientsInput] = useState("");
  const [symptomsInput, _setSymptomsInput] = useState("");
  const [errorMessage, setErrorMessage] = useState({ field: "", message: "" });
  // Messages (only for user input): falls behalten wird, dann noch stylen
  // const [alreadySelectedIngredient, setAlreadySelectedIngredient] =
  //   useState(false);
  // const [alreadySelectedSymptom, setAlreadySelectedSymptom] = useState(false);

  const router = useRouter();

  function setIngredientsInput(inputValue) {
    if (inputValue.includes(",")) {
    } else {
      _setIngredientsInput(inputValue);
    }
  }

  function setSymptomsInput(inputValue) {
    if (inputValue.includes(",")) {
    } else {
      _setSymptomsInput(inputValue);
    }
  }

  function handleIngredientsChange(event) {
    const userInput = event.target.value;
    getSuggestion(
      userInput,
      ingredients,
      setIngredientSuggestion,
      selectedIngredients
    );
    setIngredientsInput(userInput || "");
    setErrorMessage("");
    setAlreadySelectedIngredient(false);
  }

  function handleSymptomsChange(event) {
    const userInput = event.target.value;
    getSuggestion(userInput, symptoms, setSymptomSuggestion, selectedSymptoms);
    setSymptomsInput(userInput || "");
    setErrorMessage("");
  }

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  function selectIngredient(ingredientToBeSelected) {
    if (selectedIngredients.includes(ingredientToBeSelected)) {
      // {
      //   setAlreadySelectedIngredient(true);
      // }
    } else {
      setSelectedIngredients([...selectedIngredients, ingredientToBeSelected]);
      setIngredientsInput("");
      setIngredientSuggestion("");
      setAlreadySelectedIngredient(false);
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
      symptomsInput &&
      !selectedSymptoms.includes(event.target.value.slice(0).trim())
    ) {
      setSelectedSymptoms([
        ...selectedSymptoms,
        event.target.value.slice(0).trim(),
      ]);
      setSymptomsInput("");
    }
  }

  function deleteSelectedSymptom(symptomToBeDeleted) {
    setSelectedSymptoms(
      selectedSymptoms.filter((symptom) => symptom !== symptomToBeDeleted)
    );
  }

  useEffect(() => {
    recipeToEdit && setSelectedIngredients(recipeToEdit.ingredients);
  }, [recipeToEdit]);
  useEffect(() => {
    recipeToEdit && setSelectedSymptoms(recipeToEdit.symptoms);
  }, [recipeToEdit]);

  function handleSubmit(event) {
    event.preventDefault();
    if (selectedIngredients.length === 0) {
      setErrorMessage({
        field: "ingredients",
        message: "Please add at least one ingredient.",
      });
      return;
    } else if (selectedSymptoms.length === 0) {
      setErrorMessage({
        field: "symptoms",
        message: "Please add at least one symptom.",
      });
      return;
    }
    setErrorMessage({ field: "", message: "" });
    const formData = new FormData(event.target);
    const userRecipe = Object.fromEntries(formData);
    userRecipe.ingredients = [...selectedIngredients];
    userRecipe.symptoms = [...selectedSymptoms];
    recipeToEdit
      ? onEditRecipe(userRecipe, recipeToEdit)
      : onAddRecipe(userRecipe);
    event.target.reset();
    router.push("/");
  }

  return (
    <>
      <button onClick={() => router.back()}>Cancel</button>
      {recipeToEdit ? (
        <h2>Edit your Recipe</h2>
      ) : (
        <StyledHeadline>Add your Recipe</StyledHeadline>
      )}
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          placeholder="What's the recipe's name?"
          minLength="1"
          maxLength="50"
          id="title"
          name="title"
          required
          defaultValue={recipeToEdit?.title}
        ></input>
        <label htmlFor="ingredients">Ingredients</label>
        {/* {alreadySelectedIngredient && <p>Ingredient already selected.</p>} */}
        <input
          value={ingredientsInput}
          type="text"
          placeholder="What ingredients are needed?"
          minLength="1"
          maxLength="50"
          id="ingredients"
          name="ingredients"
          onChange={handleIngredientsChange}
        ></input>
        {errorMessage.field === "ingredients" && (
          <ErrorMessage>{errorMessage.message}</ErrorMessage>
        )}
        {ingredientsInput && (
          <div>
            {ingredientSuggestion && (
              <button
                type="button"
                onClick={() => selectIngredient(ingredientSuggestion)}
              >
                {ingredientSuggestion}
              </button>
            )}
            {ingredientsInput && (
              <button
                type="button"
                onClick={() => selectIngredient(ingredientsInput)}
              >
                {ingredientsInput}
              </button>
            )}
          </div>
        )}
        <ul>
          {selectedIngredients.map((ingredient) => (
            <ListItemSelectedValues key={ingredient}>
              <p>{ingredient}</p>
              <button
                type="button"
                onClick={() => deleteSelectedIngredient(ingredient)}
              >
                ❌
              </button>
            </ListItemSelectedValues>
          ))}
        </ul>
        <label htmlFor="preparation">Preparation</label>
        <input
          type="text"
          placeholder="e.g Add thyme to the water"
          minLength="1"
          maxLength="150"
          required
          id="preparation"
          name="preparation"
          defaultValue={recipeToEdit?.preparation}
        ></input>
        <label htmlFor="usage">Usage</label>
        <input
          type="text"
          placeholder="How to use it?"
          minLength="4"
          maxLength="300"
          required
          id="usage"
          name="usage"
          defaultValue={recipeToEdit?.usage}
        ></input>
        <label htmlFor="symptoms">Symptoms</label>
        {/* {alreadySelectedSymptom && <p>Symptom already selected.</p>} */}
        <input
          value={symptomsInput}
          type="text"
          placeholder="min 2 Symptoms"
          id="symptoms"
          name="symptoms"
          onChange={handleSymptomsChange}
          onKeyPress={selectUserSymptom}
        ></input>
        {errorMessage.field === "symptoms" && (
          <ErrorMessage>{errorMessage.message}</ErrorMessage>
        )}
        {symptomSuggestion && (
          <button type="button" onClick={selectSuggestedSymptom}>
            Click to select suggestion: {symptomSuggestion}
          </button>
        )}
        <ul>
          {selectedSymptoms.map((symptom) => (
            <li key={symptom}>
              <p>{symptom}</p>
              <button
                type="button"
                onClick={() => deleteSelectedSymptom(symptom)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
        <button type="submit">Save</button>
      </StyledForm>
      <WhiteSpace></WhiteSpace>
    </>
  );
}
