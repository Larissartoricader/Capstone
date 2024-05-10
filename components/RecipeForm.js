import { ingredients } from "@/lib/ingredients";
import { symptoms } from "@/lib/symptoms";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getSuggestion } from "@/utils/get-suggestions";
import { useRouter } from "next/router";
import useSWR from "swr";

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

const FakeDropDown = styled.div`
  width: 85vw;
  border: solid black 1px;
`;
const DropDownOption = styled.button`
  width: 85vw;
  background-color: white;
  text-align: left;
  border: none;
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

export default function RecipeForm({ recipeToEdit }) {
  const [ingredientSuggestion, setIngredientSuggestion] = useState();
  const [symptomSuggestion, setSymptomSuggestion] = useState();
  const [ingredientsInput, setIngredientsInput] = useState("");
  const [symptomsInput, setSymptomsInput] = useState("");
  const [errorMessage, setErrorMessage] = useState({ field: "", message: "" });

  const router = useRouter();

  function handleIngredientsChange(event) {
    const userInput = event.target.value;
    const suggestion = getSuggestion(
      userInput,
      ingredients,
      selectedIngredients
    );
    setIngredientSuggestion(suggestion);
    setIngredientsInput(userInput || "");
    setErrorMessage("");
  }

  function handleSymptomsChange(event) {
    const userInput = event.target.value;
    getSuggestion(userInput, symptoms, setSymptomSuggestion, selectedSymptoms);
    setSymptomsInput(userInput || "");
    setErrorMessage("");
  }

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  function selectIngredient(ingredientToBeSelected) {
    if (!selectedIngredients.includes(ingredientToBeSelected)) {
      setSelectedIngredients([...selectedIngredients, ingredientToBeSelected]);
      setIngredientsInput("");
      setIngredientSuggestion("");
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

  // function selectSuggestedSymptom() {
  //   selectedSymptoms.includes(symptomSuggestion) ||
  //     setSelectedSymptoms([...selectedSymptoms, symptomSuggestion]);
  // }

  function selectSymptom(symptomToBeSelected) {
    if (!selectedSymptoms.includes(symptomToBeSelected)) {
      setSelectedSymptoms([...selectedSymptoms, symptomToBeSelected]);
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

  const { mutate } = useSWR("/api/recipes");

  async function handleSubmit(event) {
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
    const response = await fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userRecipe),
    });

    if (response.ok) {
      mutate();
    }
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
          <FakeDropDown>
            {ingredientSuggestion && (
              <DropDownOption
                type="button"
                onClick={() => selectIngredient(ingredientSuggestion)}
              >
                {ingredientSuggestion}
              </DropDownOption>
            )}
            <DropDownOption
              type="button"
              onClick={() => selectIngredient(ingredientsInput)}
            >
              {ingredientsInput}
            </DropDownOption>
          </FakeDropDown>
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
        <input
          value={symptomsInput}
          type="text"
          placeholder="min 2 Symptoms"
          id="symptoms"
          name="symptoms"
          onChange={handleSymptomsChange}
        ></input>
        {errorMessage.field === "symptoms" && (
          <ErrorMessage>{errorMessage.message}</ErrorMessage>
        )}
        {symptomsInput && (
          <FakeDropDown>
            {symptomSuggestion && (
              <DropDownOption
                type="button"
                onClick={() => selectSymptom(symptomSuggestion)}
              >
                {symptomSuggestion}
              </DropDownOption>
            )}
            <DropDownOption
              type="button"
              onClick={() => selectSymptom(symptomsInput)}
            >
              {symptomsInput}
            </DropDownOption>
          </FakeDropDown>
        )}
        <ul>
          {selectedSymptoms.map((symptom) => (
            <ListItemSelectedValues key={symptom}>
              <p>{symptom}</p>
              <button
                type="button"
                onClick={() => deleteSelectedSymptom(symptom)}
              >
                ❌
              </button>
            </ListItemSelectedValues>
          ))}
        </ul>
        <button type="submit">Save</button>
      </StyledForm>
      <WhiteSpace />
    </>
  );
}
