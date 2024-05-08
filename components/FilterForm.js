// import { useState } from "react";
// import styled from "styled-components";

// const SearchBox = styled.div`
//   margin-inline: 40px;
// `;

// const StyledFilterForm = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

// export default function FilterForm({ recipes }) {
//   const [filteredRecipes, setFilteredRecipes] = useState([]);
//   const [symptomsInput, setSymptomsInput] = useState("");
//   const [symptomSuggestion, setSymptomSuggestion] = useState();
//   const [ingredientInput, setIngredientInput] = useState("");

//   function handleSymptomsChange(event) {
//     const userInput = event.target.value;
//     setSymptomsInput(userInput || "");
//   }

//   function handleIngredientChange(event) {
//     const userInput = event.target.value;
//     setIngredientInput(userInput || "");
//   }

//   function filterRecipes(symptom, ingredient) {
//     const recipesLowerCase = recipes.map((recipe) => ({
//       ...recipe,
//       symptoms: recipe.symptoms.map((symptom) => symptom.toLowerCase()),
//       ingredients: recipe.ingredients.map((ingredient) =>
//         ingredient.toLowerCase()
//       ),
//     }));

//     let filteredRecipes = [...recipesLowerCase];

//     if (symptom) {
//       filteredRecipes = filteredRecipes.filter((recipe) =>
//         recipe.symptoms.includes(symptom.toLowerCase())
//       );
//     }

//     if (ingredient) {
//       filteredRecipes = filteredRecipes.filter((recipe) =>
//         recipe.ingredients.includes(ingredient.toLowerCase())
//       );
//     }

//     return filteredRecipes;
//   }

//   function handleSearchSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const userSymptom = formData.get("symptom").toLowerCase();
//     console.log(userSymptom);

//     const userIngredient = formData.get("ingredient").toLowerCase();
//     console.log(userIngredient);

//     const filtered = filterRecipes(userSymptom, userIngredient);
//     setFilteredRecipes(filtered);
//   }

//   return (
//     <SearchBox>
//       <h2>Search Recipes</h2>
//       <StyledFilterForm onSubmit={handleSearchSubmit}>
//         <label htmlFor="symptom">Select a Symptom </label>
//         <input
//           placeholder="Type your symptom and select from the list"
//           type="text"
//           id="symptom"
//           name="symptom"
//           onChange={handleSymptomsChange}
//         />
//         <div>{symptomSuggestion && <p>Symptom: {symptomSuggestion}</p>}</div>

//         <label htmlFor="ingredient">Select an ingredient </label>
//         <input
//           type="text"
//           id="ingredient"
//           name="ingredient"
//           onChange={handleIngredientChange}
//         />
//         <div>{ingredientInput && <p>Ingredient: {ingredientInput}</p>}</div>

//         <button>Search</button>
//       </StyledFilterForm>
//       {filteredRecipes.length > 0 ? (
//         <div>
//           <h3>The Perfect Recipes for you</h3>
//           <ul>
//             {filteredRecipes.map((recipe) => (
//               <li key={recipe.index}>{recipe.title}</li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <p>No recipes found. Try different search criteria.</p>
//       )}
//     </SearchBox>
//   );
// }

import { useState } from "react";
import styled from "styled-components";

const SearchBox = styled.div`
  margin-inline: 40px;
  background-color: lightgrey;
  margin: 5px;
  padding: 5px;
  border-radius: 10px;
`;

const StyledFilterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledFilterInfo = styled.p`
  font-size: 12px;
`;

export default function FilterForm({ recipes }) {
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [symptomSuggestions, setSymptomSuggestions] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientSuggestions, setIngredientSuggestions] = useState([]);
  const [searchSubmitted, setSearchSubmitted] = useState(false); // New state variable

  function handleSymptomsChange(event) {
    const userInput = event.target.value;
    setSymptomSuggestions([]);

    const suggestions = recipes.reduce((acc, recipe) => {
      const matchingSymptoms = recipe.symptoms.filter((symptom) =>
        symptom.toLowerCase().startsWith(userInput.toLowerCase())
      );
      return [...acc, ...matchingSymptoms];
    }, []);
    setSymptomSuggestions(Array.from(new Set(suggestions)));
  }

  function handleIngredientChange(event) {
    const userInput = event.target.value;
    setIngredientSuggestions([]);

    const suggestions = recipes.reduce((acc, recipe) => {
      const matchingIngredients = recipe.ingredients.filter((ingredient) =>
        ingredient.toLowerCase().startsWith(userInput.toLowerCase())
      );
      return [...acc, ...matchingIngredients];
    }, []);
    setIngredientSuggestions(Array.from(new Set(suggestions)));
  }

  function handleSymptomSuggestionClick(suggestion) {
    setSelectedSymptoms((prevSelectedSymptoms) => [
      ...prevSelectedSymptoms,
      suggestion,
    ]);
    setSymptomSuggestions([]);
  }

  function handleIngredientSuggestionClick(suggestion) {
    setSelectedIngredients((prevSelectedIngredients) => [
      ...prevSelectedIngredients,
      suggestion,
    ]);
    setIngredientSuggestions([]);
  }

  function removeSelectedSymptom(index) {
    setSelectedSymptoms((prevSelectedSymptoms) => {
      const updatedSymptoms = [...prevSelectedSymptoms];
      updatedSymptoms.splice(index, 1);
      return updatedSymptoms;
    });
  }

  function removeSelectedIngredient(index) {
    setSelectedIngredients((prevSelectedIngredients) => {
      const updatedIngredients = [...prevSelectedIngredients];
      updatedIngredients.splice(index, 1);
      return updatedIngredients;
    });
  }

  function filterRecipes() {
    let filteredRecipes = [...recipes];

    if (selectedSymptoms.length > 0) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        selectedSymptoms.every((symptom) => recipe.symptoms.includes(symptom))
      );
    }

    if (selectedIngredients.length > 0) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        selectedIngredients.every((ingredient) =>
          recipe.ingredients.includes(ingredient)
        )
      );
    }

    return filteredRecipes;
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    const filtered = filterRecipes();
    setFilteredRecipes(filtered);
    setSearchSubmitted(true); // Mark search as submitted
    event.target.reset();
  }

  return (
    <SearchBox>
      <h2>Search Recipes</h2>
      <StyledFilterInfo>
        Find the perfect recipe for you based on a symptom and/or ingredient{" "}
      </StyledFilterInfo>
      <StyledFilterForm onSubmit={handleSearchSubmit}>
        <label htmlFor="symptom">Select a symptom</label>
        <StyledFilterInfo>Please, select only one symptom.</StyledFilterInfo>
        <input
          placeholder="Type your symptom and select from the list"
          type="text"
          id="symptom"
          name="symptom"
          onChange={handleSymptomsChange}
        />
        <div>
          {selectedSymptoms.map((symptom, index) => (
            <p key={index}>
              {symptom}{" "}
              <span onClick={() => removeSelectedSymptom(index)}>✖️</span>
            </p>
          ))}
          {symptomSuggestions.map((suggestion, index) => (
            <p
              key={index}
              onClick={() => handleSymptomSuggestionClick(suggestion)}
            >
              {suggestion}
            </p>
          ))}
        </div>

        <label htmlFor="ingredient">Select one ingredient </label>
        <StyledFilterInfo>Select only one Ingredient.</StyledFilterInfo>
        <input
          placeholder="Type an ingredient and select from the list"
          type="text"
          id="ingredient"
          name="ingredient"
          onChange={handleIngredientChange}
        />
        <div>
          {selectedIngredients.map((ingredient, index) => (
            <p key={index}>
              {ingredient}{" "}
              <span onClick={() => removeSelectedIngredient(index)}>✖️</span>
            </p>
          ))}
          {ingredientSuggestions.map((suggestion, index) => (
            <p
              key={index}
              onClick={() => handleIngredientSuggestionClick(suggestion)}
            >
              {suggestion}
            </p>
          ))}
        </div>

        <button>Search</button>
      </StyledFilterForm>
      {/* Display message only if search is submitted and no results */}
      {searchSubmitted && filteredRecipes.length === 0 && (
        <p>Ups! No recipe to be found. How about trying another criteria?</p>
      )}
      {filteredRecipes.length > 0 ? (
        <div>
          <h3>The Perfect Recipes for you</h3>
          <ul>
            {filteredRecipes.map((recipe, index) => (
              <li key={index}>{recipe.title}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </SearchBox>
  );
}
