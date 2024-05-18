import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import useSWR from "swr";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { filterArray } from "@/utils/filter-array";
import { useSession } from "next-auth/react";

const FormHeadline = styled.h2`
  text-align: center;
  font-family: var(--headline-font);
font-size: 210%; color: var(--font-color);`

const StyledForm = styled.form`
  border: var(--general-border);
  border-radius: var(--big-box-border-radius);
  font-size: 100%; 
font-family: var(--general-font);
  color: var(--font-color);
  background-color: var(--secondary-background-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 90%;
  ` 

// Others
const ErrorMessage = styled.div`
  color: red;
  margin: 5px 0;
  padding: 7px; 
  width: 80%;
`;

const InputFieldLabel = styled.label`
padding: 10px 10px;
width: 80%;
text-align: left;`

const TitleInputField = styled.input`
border: var(--general-border);
border-radius: var( --small-box-border-radius);
font-size: var(--input-field-font-size); 
font-family: var(--general-font); 
padding: 10px; 
width: 80%;`

const BiggerFormField = styled.textarea`border: var(--general-border); border-radius: 12px; font-size: var(--input-field-font-size); font-family: var(--general-font); 
height: 15vh;
width: 80%; 
margin: 10px 0;
padding: 10px; 
`
// Small Input Fields and Drop Down
const ContainerOfInputFieldAndDropDown = styled.div`width: 80%; 
margin-right: 22px;
position: relative;
`

const IngredientsSymptomsInputField = styled.input`
border: var(--general-border);
padding: 10px; 
font-size: var(--label-font-size); 
font-family: var(--general-font); 
width: 100%;
border-radius: ${props => (props.symptomSuggestions || props.symptomsInput) ? '8px 8px 0 0' : '8px'};
/* border-radius: 50px 8px 0 0; */
background-color: ${props => (
  (props.symptomSuggestions && props.symptomSuggestions.length > 0) ||
  (props.symptomsInput && props.symptomsInput.length > 0)
) ? 'hotpink' : 'yellow'};
`

const FakeDropDown = styled.div`
padding: 10px; 
  border: var(--general-border);
  border-radius: 0 0 8px 8px;
  background-color: var(--secondary-background-color);
  width: 100%;
  z-index: 1;
`;

const DropDownOption = styled.button`
  background-color: var(--secondary-background-color);
  text-align: left;
  border: none;
  font-size: var(--label-font-size); font-family: var(--label-font);
  width: 100%;
`;

// Selection 
const Selection = styled.ul`
display: flex; 
flex-wrap: wrap;
list-style: none; width: 80%;
margin: 10px 0; padding: 0;
`

const SelectedValue = styled.li`
display: inline-block;
gap: 2%;
  border: solid grey 2px;
  border-radius: var( --small-box-border-radius);
  width: auto;
  padding: 0 2vw; margin: 0 0;
  font-size: var(--input-field-font-size); font-family: var(--label-font);
`;

const SelectedValueText = styled.p`display: inline-block; margin: 0; padding: 0;`

const SelectedValueButton = styled.button`border: none; background-color: var( --secondary-background-color); display: inline-block;`


// Buttons
const ButtonContainer = styled.div`display: flex; justify-content: space-around; width: 80%; margin-bottom: 5%; padding: 0;`

const SubmitButton = styled.button`background-color: #ffc107; 
border: var(--general-border);border-radius: var(--small-box-border-radius); 
width: 45%; height: 3vh; font-family: var(--general-font); font-size: var(--label-font-size);   &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }`
const CancelButton = styled.button`
background-color: #ff0000; 
/* color: white; */
border: var(--general-border);border-radius: var(--small-box-border-radius); width: 45%; height: 3vh; font-family: var(--general-font); font-size: var(--label-font-size); &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  `

const WhiteSpace = styled.div`
  height: 20vh;
`;

export default function RecipeForm({ recipeToEdit }) {
  const [ingredientSuggestions, setIngredientSuggestions] = useState();
  const [symptomSuggestions, setSymptomSuggestions] = useState();
  const [ingredientsInput, setIngredientsInput] = useState("");
  const [symptomsInput, setSymptomsInput] = useState("");
  const [errorMessage, setErrorMessage] = useState({ field: "", message: "" });

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
        // setIngredientsInput("");
      }
      if (
        symptomDropdownRef.current &&
        !symptomDropdownRef.current.contains(event.target)
      ) {
        setSymptomSuggestions([]);
        // setSymptomsInput("")
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
    toast.success("Recipe created successfully!", {});
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

  console.log("ingredientsInput", ingredientsInput);
  console.log("ingredientsSuggestion", ingredientSuggestions);

  return (
    <>
      {recipeToEdit ? (
        <FormHeadline>Edit your Recipe</FormHeadline>
      ) : (
        <FormHeadline>Add your Recipe</FormHeadline>
      )}
      <StyledForm onSubmit={handleSubmit}>
        <InputFieldLabel htmlFor="title">Title</InputFieldLabel>
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
          maxLength="150"
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
