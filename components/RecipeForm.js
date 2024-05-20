import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import useSWR from "swr";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { filterArray } from "@/utils/filter-array";
import { useSession } from "next-auth/react";
import { Circles } from "react-loader-spinner";

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

const BiggerFormField = styled.textarea`
  height: 10vh;
`;

const LoadingSpinner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 999;
`;

export default function RecipeForm({ recipeToEdit }) {
  const [ingredientSuggestions, setIngredientSuggestions] = useState();
  const [symptomSuggestions, setSymptomSuggestions] = useState();
  const [ingredientsInput, setIngredientsInput] = useState("");
  const [symptomsInput, setSymptomsInput] = useState("");
  // "error" message if input field is empty
  const [errorMessage, setErrorMessage] = useState({ field: "", message: "" });
  const [showLoading, setShowLoading] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();

  function handleIngredientsChange(event) {
    const userInput = event.target.value;
    setIngredientSuggestions([]);
    const suggestions = recipes.reduce((acc, recipe) => {
      const matchingIngredients = recipe.ingredients.filter((ingredient) =>
        ingredient.toLowerCase().startsWith(userInput.toLowerCase())
      );
      return [...acc, ...matchingIngredients];
    }, []);
    const notYetSelectedIngredients = filterArray(
      suggestions,
      selectedIngredients
    );
    setIngredientSuggestions(Array.from(new Set(notYetSelectedIngredients)));
    setIngredientsInput(userInput);
    setErrorMessage("");
  }

  function handleSymptomsChange(event) {
    const userInput = event.target.value;
    setSymptomSuggestions([]);
    const suggestions = recipes.reduce((acc, recipe) => {
      const matchingSymptoms = recipe.symptoms.filter((symptom) =>
        symptom.toLowerCase().startsWith(userInput.toLowerCase())
      );
      return [...acc, ...matchingSymptoms];
    }, []);
    const notYetSelectedSymptoms = filterArray(suggestions, selectedSymptoms);
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
        (ingredient) => ingredient !== ingredientToBeDeleted
      )
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
      selectedSymptoms.filter((symptom) => symptom !== symptomToBeDeleted)
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
      if (
        ingredientDropdownRef.current &&
        !ingredientDropdownRef.current.contains(event.target)
      ) {
        setIngredientSuggestions([]);
      }
      if (
        symptomDropdownRef.current &&
        !symptomDropdownRef.current.contains(event.target)
      ) {
        setSymptomSuggestions([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //SUBMIT

  const {
    data: recipes,
    error: fetchError,
    isLoading,
    mutate,
  } = useSWR("/api/recipes");

  async function handleSubmit(event) {
    event.preventDefault();
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

    setShowLoading(true);

    const formData = new FormData(event.target);
    const userRecipe = Object.fromEntries(formData);
    userRecipe.ingredients = [...selectedIngredients];
    userRecipe.symptoms = [...selectedSymptoms];
    try {
      if (recipeToEdit) {
        const response = await fetch(`/api/recipes/${recipeToEdit._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userRecipe),
        });
        console.log(response);
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
    } catch (error) {
      console.error("Failed to submit", error);
    } finally {
      setShowLoading(false);
      toast.success("Recipe created successfully!", {});
    }
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (fetchError) {
    return <h1>Oops! Something went wrong..</h1>;
  }

  if (status !== "authenticated") {
    return <h2>Access denied!</h2>;
  }

  return (
    <>
      <button type="button" onClick={() => router.back()}>
        Cancel
      </button>
      {recipeToEdit ? (
        <h2>Edit your Recipe</h2>
      ) : (
        <StyledHeadline>Add your Recipe</StyledHeadline>
      )}
      {showLoading && (
        <LoadingSpinner>
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
          />
        </LoadingSpinner>
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
        />
        <label htmlFor="ingredients">Ingredients</label>
        <input
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
              ingredientSuggestions.map((suggestion) => (
                <DropDownOption
                  key={suggestion}
                  type="button"
                  onClick={() => selectIngredient(suggestion)}
                >
                  {suggestion}
                </DropDownOption>
              ))}
            {ingredientsInput && (
              <DropDownOption
                type="button"
                onClick={() => selectIngredient(ingredientsInput)}
              >
                {ingredientsInput}
              </DropDownOption>
            )}
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
        <label htmlFor="usage">Usage</label>
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
        <label htmlFor="symptoms">Symptoms</label>
        <input
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
        {(symptomSuggestions || symptomsInput) && (
          <FakeDropDown ref={symptomDropdownRef}>
            {symptomSuggestions &&
              symptomSuggestions.map((suggestion) => (
                <DropDownOption
                  key={suggestion}
                  type="button"
                  onClick={() => selectSymptom(suggestion)}
                >
                  {suggestion}
                </DropDownOption>
              ))}
            {symptomsInput && (
              <DropDownOption
                type="button"
                onClick={() => selectSymptom(symptomsInput)}
              >
                {symptomsInput}
              </DropDownOption>
            )}
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
        <button>Save</button>
      </StyledForm>
      <WhiteSpace />
    </>
  );
}
