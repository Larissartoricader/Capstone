import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import useSWR from "swr";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { filterArray } from "@/utils/filter-array";

const FormHeadline = styled.h2`
  text-align: center;
  font-family: var(--headline-font);
font-size: 200%;`

const StyledForm = styled.form`
  border: var(--general-border);
 border-radius: var(--big-box-border-radius);
  font-size: 14px;
  display: flex;
  flex-direction: column;
  margin: 5px;
  padding: 0 10%;
; background-color: var(--secondary-background-color);`

const FakeDropDown = styled.div`
  width: var(--input-field-width);
  border: solid black 1px;
  background-color: var(--box-background-color);
`;
const DropDownOption = styled.button`
  width: 85vw;
  background-color: var(--box-background-color);
  text-align: left;
  border: none;
  font-size: var(--label-font-size); font-family: var(--label-font);
  width: var(--input-field-width);
`;

const ListItemSelectedValues = styled.li`
  display: flex;
  gap: 2vw;
  border: solid grey 2px;
  border-radius: 5px;
  width: auto;
  padding: 0 2vw;
  font-size: var(--label-font-size); font-family: var(--label-font);
`;

const DeleteSelectedButton = styled.button`background-color: var( --secondary-background-color);`

const ErrorMessage = styled.div`
  color: red;
  margin: 5px 0;
`;


const WhiteSpace = styled.div`
  height: 20vh;
`;

const BiggerFormField = styled.textarea`border: var(--general-border);height: 10vh; margin: 0 0;font-size: var(--label-font-size); font-family: var(--label-font); border-radius: 12px;
`

const InputFieldLabel = styled.label`padding: 15px 0 10px 0; margin: 0 0; font-size: var(--label-font-size); font-family: var(--label-font);`

const InputField = styled.input`
border: var(--general-border);
padding: 2px 2px; 
font-size: var(--label-font-size); font-family: var(--label-font); width: var(--input-field-width); border-radius: var(--small-box-border-radius);`
const ButtonContainer = styled.div`display: flex; gap: 10px;`
const SubmitButton = styled.button`background-color: #ffc107; margin-bottom: 5%; border-radius: var(--small-box-border-radius); width: 40%; height: 3vh;`
const CancelButton = styled.button`background-color: #ff0000; margin-bottom: 5%; border-radius: var(--small-box-border-radius); width: 40%; height: 3vh;`



export default function RecipeForm({ recipeToEdit }) {
  const [ingredientSuggestions, setIngredientSuggestions] = useState();
  const [symptomSuggestions, setSymptomSuggestions] = useState();
  const [ingredientsInput, setIngredientsInput] = useState("");
  const [symptomsInput, setSymptomsInput] = useState("");
  // "error" message if input field is empty
  const [errorMessage, setErrorMessage] = useState({ field: "", message: "" });

  const router = useRouter();
  

  function handleIngredientsChange(event) {
    const userInput = event.target.value;
    setIngredientSuggestions([]);
    const suggestions = recipes.reduce((acc, recipe) => {
      const matchingIngredients = recipe.ingredients.filter((ingredient) =>
        ingredient.toLowerCase().startsWith(userInput.toLowerCase()),
      );
      return [...acc, ...matchingIngredients];
    }, []);
    const notYetSelectedIngredients = filterArray(suggestions, selectedIngredients)
    setIngredientSuggestions(Array.from(new Set(notYetSelectedIngredients)));
    setIngredientsInput(userInput);
    setErrorMessage("");
  };


  function handleSymptomsChange(event) {
    const userInput = event.target.value;
    setSymptomSuggestions([]);
    const suggestions = recipes.reduce((acc, recipe) => {
      const matchingSymptoms = recipe.symptoms.filter((symptom) =>
        symptom.toLowerCase().startsWith(userInput.toLowerCase()),
      );
      return [...acc, ...matchingSymptoms];
    }, []);
    const notYetSelectedSymptoms = filterArray(suggestions, selectedSymptoms)
    setSymptomSuggestions(Array.from(new Set(notYetSelectedSymptoms)));
    setSymptomsInput(userInput);
    setErrorMessage("");
  }

 
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  function selectIngredient(ingredientToBeSelected) {
    if (!selectedIngredients.includes(ingredientToBeSelected)) {
      setSelectedIngredients([...selectedIngredients, ingredientToBeSelected]);
      setIngredientsInput("");
      setIngredientSuggestions();
    }
  }

  function deleteSelectedIngredient(ingredientToBeDeleted) {
    setSelectedIngredients(
      selectedIngredients.filter(
        (ingredient) => ingredient !== ingredientToBeDeleted,
      ),
    );
  }

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  function selectSymptom(symptomToBeSelected) {
    if (!selectedSymptoms.includes(symptomToBeSelected)) {
      setSelectedSymptoms([...selectedSymptoms, symptomToBeSelected]);
      setSymptomsInput("");
      setSymptomSuggestions();
    } 
  }


  function deleteSelectedSymptom(symptomToBeDeleted) {
    setSelectedSymptoms(
      selectedSymptoms.filter((symptom) => symptom !== symptomToBeDeleted),
    );
  }

  useEffect(() => {
    recipeToEdit && setSelectedIngredients(recipeToEdit.ingredients);
  }, [recipeToEdit]);
  useEffect(() => {
    recipeToEdit && setSelectedSymptoms(recipeToEdit.symptoms);
  }, [recipeToEdit]);

  

  const ingredientDropdownRef = useRef(null);
  const symptomDropdownRef = useRef(null);
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (ingredientDropdownRef.current && !ingredientDropdownRef.current.contains(event.target)) {
        setIngredientSuggestions([]);
      }
      if (symptomDropdownRef.current && !symptomDropdownRef.current.contains(event.target)) {
        setSymptomSuggestions([]);
      }
    }
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

//SUBMIT
const [prediction, setPrediction] = useState(null);
const [error, setError] = useState(null);
const { data: recipes, error: fetchError, isLoading, mutate } = useSWR("/api/recipes");
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

  async function handleSubmit(event) {
    event.preventDefault();
    // 1. handle empty input
    if (selectedIngredients.length === 0) {
      setErrorMessage({
        field: "ingredients",
        message: "Please add at least one ingredient.",
      });
      return;
    }
    if (selectedSymptoms.length === 0) {
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

    if (recipeToEdit) {
      const response = await fetch(`/api/recipes/${recipeToEdit._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userRecipe),
      });
      if (response.ok) {
        mutate();
      }
    } else {
      userRecipe.editable = true;
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
    }

    event.target.reset();
    router.push("/");
    toast.success("Recipe created successfully!", {});
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (fetchError) {
    return <h1>Oops! Something went wrong..</h1>;
  }

  return (
    <>
     
      {recipeToEdit ? (
        <FormHeadline>Edit your Recipe</FormHeadline>
      ) : (
        <FormHeadline>Add your Recipe</FormHeadline>
      )}
      <StyledForm onSubmit={handleSubmit}>
        <InputFieldLabel htmlFor="title">Title</InputFieldLabel>
        <InputField
          type="text"
          placeholder="What's the recipe's name?"
          minLength="1"
          maxLength="50"
          id="title"
          name="title"
          required
          defaultValue={recipeToEdit?.title}
        />
        <InputFieldLabel htmlFor="ingredients">Ingredients</InputFieldLabel>
        <InputField
          type="text"
          placeholder="What ingredients are needed?"
          minLength="1"
          maxLength="50"
          id="ingredients"
          name="ingredients"
          onChange={handleIngredientsChange}
          value={ingredientsInput}
        />
        {errorMessage.field === "ingredients" && (
          <ErrorMessage>{errorMessage.message}</ErrorMessage>
        )}
{(ingredientSuggestions || ingredientsInput) && (
          <FakeDropDown ref={ingredientDropdownRef}>
              {ingredientSuggestions && 
            ingredientSuggestions.map((suggestion) => <DropDownOption
            key={suggestion}
            type="button"
            onClick={() => selectIngredient(suggestion)}
          >
            {suggestion}
          </DropDownOption> 
            )}
            {ingredientsInput && <DropDownOption
              type="button"
              onClick={() => selectIngredient(ingredientsInput)}
            >
              {ingredientsInput}
            </DropDownOption>}
          </FakeDropDown>
        )}
        <ul>
          {selectedIngredients.map((ingredient) => (
            <ListItemSelectedValues key={ingredient}>
              <p>{ingredient}</p>
              <DeleteSelectedButton
                type="button"
                onClick={() => deleteSelectedIngredient(ingredient)}
              >
                ✖️
              </DeleteSelectedButton>
            </ListItemSelectedValues>
          ))}
        </ul>
        <InputFieldLabel htmlFor="preparation">Preparation</InputFieldLabel>
        <BiggerFormField
          type="text"
          placeholder="e.g Add thyme to the water"
          minLength="1"
          maxLength="150"
          required
          id="preparation"
          name="preparation"
          defaultValue={recipeToEdit?.preparation}
        />
        <InputFieldLabel htmlFor="usage">Usage</InputFieldLabel>
        <BiggerFormField
          type="text"
          placeholder="How to use it?"
          minLength="4"
          maxLength="300"
          required
          id="usage"
          name="usage"
          defaultValue={recipeToEdit?.usage}
        />
        <InputFieldLabel htmlFor="symptoms">Symptoms</InputFieldLabel>
        <InputField
          type="text"
          placeholder="min 2 Symptoms"
          id="symptoms"
          name="symptoms"
          onChange={handleSymptomsChange}
          value={symptomsInput}
        />
        {errorMessage.field === "symptoms" && (
          <ErrorMessage>{errorMessage.message}</ErrorMessage>
        )}
        {(symptomSuggestions || symptomsInput) && (
          <FakeDropDown ref={symptomDropdownRef}>
              {symptomSuggestions && 
            symptomSuggestions.map((suggestion) => <DropDownOption
            key={suggestion}
            type="button"
            onClick={() => selectSymptom(suggestion)}
          >
            {suggestion}
          </DropDownOption> 
            )}
            {symptomsInput && <DropDownOption
              type="button"
              onClick={() => selectSymptom(symptomsInput)}
            >
              {symptomsInput}
            </DropDownOption>}
          </FakeDropDown>
        )}
        <ul>
          {selectedSymptoms.map((symptom) => (
            <ListItemSelectedValues key={symptom}>
              <p>{symptom}</p>
              <DeleteSelectedButton
                type="button"
                onClick={() => deleteSelectedSymptom(symptom)}
              >
                ✖️
              </DeleteSelectedButton>
            </ListItemSelectedValues>
          ))}
        </ul>
        <ButtonContainer> <CancelButton type="button" onClick={() => router.back()}>
        Cancel
      </CancelButton><SubmitButton type="submit">Save</SubmitButton></ButtonContainer>
        
      </StyledForm>
      <WhiteSpace />
    </>
  );
}
