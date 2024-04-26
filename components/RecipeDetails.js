import styled from "styled-components";

export default function RecipeDetails({ currentRecipe }) {
  const { title, ingredients, preparation, usage, symptoms } = currentRecipe;
  const ListItem = styled.div`
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    font-size: 14px;
    border: 2px solid black;
    display: flex;
    flex-direction: column;
    width: 80%;
  `;

  return (
    <article aria-label="Recipe Details">
      <h2>{title}</h2>
      <h3>Ingredients</h3>
      <ListItem>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ListItem>

      <h3>Preperation</h3>
      <button>Preparation</button>
      <p>{preparation}</p>
      <p>Usage: {usage}</p>
      <h3> Symptoms</h3>

      <ListItem>
        {symptoms.map((symptoms, index) => (
          <li key={index}>{symptoms}</li>
        ))}
      </ListItem>
    </article>
  );
}
