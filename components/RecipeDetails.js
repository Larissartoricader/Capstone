import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

const ListItem = styled.ul`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 5px;
  padding: 25px;
`;

const CollapsibleButton = styled.button`
  background-color: #777;
  color: white;
  cursor: pointer;
  padding: 18px;
  margin: 5px;
  width: 80%;
  border-radius: 5px;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
`;

const CollapsibleContent = styled.div`
  padding: 0 18px;
  margin: 5px;
  width: 80%;
  overflow: hidden;
  background-color: #f1f1f1;
  max-height: ${(props) => (props.isOpen ? "500px" : "0")};
  transition: max-height 0.3s ease-out;
`;

export default function RecipeDetails({ currentRecipe, passRecipeToForm }) {
  const router = useRouter();
  const { title, ingredients, preparation, usage, symptoms } = currentRecipe;

  const [isPreparationOpen, setIsPreparationOpen] = useState(false);
  const [isUsageOpen, setIsUsageOpen] = useState(false);

  const togglePreparationCollapse = () => {
    setIsPreparationOpen(!isPreparationOpen);
  };

  const toggleUsageCollapse = () => {
    setIsUsageOpen(!isUsageOpen);
  };

  function handleClick() {
    passRecipeToForm(currentRecipe);
    router.push("/recipe-form");
  }

  return (
    <article aria-label="Recipe Details">
      <h2>{title}</h2>
      <h3>Ingredients</h3>
      <ListItem>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ListItem>
      <CollapsibleButton onClick={togglePreparationCollapse}>
        Open the Preperation
      </CollapsibleButton>
      <CollapsibleContent isOpen={isPreparationOpen}>
        <p>{preparation}</p>
      </CollapsibleContent>
      <CollapsibleButton onClick={toggleUsageCollapse}>
        Open the Usage
      </CollapsibleButton>
      <CollapsibleContent isOpen={isUsageOpen}>
        <p>{usage}</p>
      </CollapsibleContent>
      <h3> Symptoms</h3>
      <ListItem>
        {symptoms.map((symptoms, index) => (
          <li key={index}>{symptoms}</li>
        ))}
      </ListItem>
      {currentRecipe.editable && <button onClick={handleClick}>Edit</button>}
    </article>
  );
}
