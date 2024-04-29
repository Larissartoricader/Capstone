import { recipes } from "./recipes";

export const getRecipes = () => {
  return recipes;
};

export const updateRecipe = ({ recipes, updatedRecipe }) => {
  const oldRecipes = recipes.filter((recipe) => recipe.id != updatedRecipe.id);

  return [...oldRecipes, updatedRecipe];
};
