import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { filterArray } from "@/utils/filter-array";
import { useSession } from "next-auth/react";
import { FormHeadline, StyledForm, ErrorMessage, InputFieldLabel, TitleInputField, BiggerFormField, ContainerOfInputFieldAndDropDown, IngredientsSymptomsInputField, FakeDropDown, DropDownOption, Selection, SelectedValue, SelectedValueText, SelectedValueButton, ButtonContainer, SubmitButton, CancelButton, WhiteSpace } from "./RecipeForm.styles";
import { Circles } from "react-loader-spinner";
import styled from "styled-components";

const LoadingSpinner = styled.div`
  position: fixed;
  inset: 0;
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
    setIngredientsInput(userInput);
    setErrorMessage("");
    if (userInput.length < 1) {setIngredientSuggestions(""); return};
    setIngredientSuggestions(Array.from(new Set(notYetSelectedIngredients)));
    
  };

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
    setSymptomsInput(userInput);
    setErrorMessage("");
    if (userInput.length < 1) {setSymptomSuggestions(""); return};
    setSymptomSuggestions(Array.from(new Set(notYetSelectedSymptoms)));
    
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
        if (response.ok) {
          mutate();
          toast.success("Recipe edited successfully!", {});
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
          toast.success("Recipe created successfully!", {});
        }
      }
      event.target.reset();
      router.push("/");
    } catch (error) {
      console.error("Failed to submit", error);
    } finally {
      setShowLoading(false);
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

  if (recipeToEdit && recipeToEdit.owner !== session.user.email) {
    return <h2>Access denied!</h2>;
  }

  return (
    <>
      {recipeToEdit ? (
        <FormHeadline>Edit your Recipe</FormHeadline>
      ) : (
        <FormHeadline>Add your Recipe</FormHeadline>
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
        <InputFieldLabel htmlFor="title" style={{paddingTop: `25px`}}>Title</InputFieldLabel>
        <TitleInputField
          type="text"
          placeholder="Your recipe's name"
          minLength="1"
          maxLength="50"
          id="title"
          name="title"
          required
          defaultValue={recipeToEdit?.title}
        />
        {errorMessage.field === "ingredients" && (
          <ErrorMessage>{errorMessage.message}</ErrorMessage>
        )}
        <InputFieldLabel htmlFor="ingredients">Ingredients</InputFieldLabel>
        <ContainerOfInputFieldAndDropDown>
        <IngredientsSymptomsInputField
          type="text"
          placeholder="What is needed"
          minLength="1"
          maxLength="50"
          id="ingredients"
          name="ingredients"
          onChange={handleIngredientsChange}
          value={ingredientsInput}
        />
        {(ingredientSuggestions || ingredientsInput) && (
          <FakeDropDown 
          ref={ingredientDropdownRef}
          >
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
        </ContainerOfInputFieldAndDropDown>
        <Selection>
          {selectedIngredients.map((ingredient) => (
            <SelectedValue key={ingredient}>
              <SelectedValueText>{ingredient}</SelectedValueText>
              <SelectedValueButton
                type="button"
                onClick={() => deleteSelectedIngredient(ingredient)}
              >
                ✖️
              </SelectedValueButton>
            </SelectedValue>
          ))}
        </Selection>
        <InputFieldLabel htmlFor="preparation">Preparation</InputFieldLabel>
        <BiggerFormField
          type="text"
          placeholder="How to make it"
          minLength="1"
          maxLength="300"
          required
          id="preparation"
          name="preparation"
          defaultValue={recipeToEdit?.preparation}
        />
        <InputFieldLabel htmlFor="usage">Usage</InputFieldLabel>
        <BiggerFormField
          type="text"
          placeholder="How to use it"
          minLength="4"
          maxLength="300"
          required
          id="usage"
          name="usage"
          defaultValue={recipeToEdit?.usage}
        />
        <InputFieldLabel htmlFor="symptoms">Symptoms</InputFieldLabel>
        {errorMessage.field === "symptoms" && (
          <ErrorMessage>{errorMessage.message}</ErrorMessage>
        )}
        <ContainerOfInputFieldAndDropDown>
        <IngredientsSymptomsInputField
          type="text"
          placeholder="What it is for"
          minLength="1"
          maxLength="50"
          id="symptoms"
          name="symptoms"
          onChange={handleSymptomsChange}
          value={symptomsInput}
        />
        {(symptomSuggestions || symptomsInput) && (
          <FakeDropDown 
          ref={symptomDropdownRef}
          >
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
        </ContainerOfInputFieldAndDropDown>
        <Selection>
          {selectedSymptoms.map((symptom) => (
            <SelectedValue key={symptom}>
              <SelectedValueText>{symptom}</SelectedValueText>
              <SelectedValueButton
                type="button"
                onClick={() => deleteSelectedSymptom(symptom)}
              >
                ✖️
              </SelectedValueButton>
            </SelectedValue>
          ))}
        </Selection>
        <ButtonContainer> <CancelButton type="button" onClick={() => router.back()}>
        Cancel
      </CancelButton><SubmitButton type="submit">Save</SubmitButton></ButtonContainer>
      </StyledForm>
      <WhiteSpace />
    </>
  );
}
