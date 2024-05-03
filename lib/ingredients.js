import { initialRecipes } from "@/lib/recipes";

const getAllIngredients = () => {
  let allIngredients = [];

  initialRecipes.forEach((recipe) => {
    allIngredients = allIngredients.concat(recipe.ingredients);
  });

  allIngredients = [...new Set(allIngredients)];

  return allIngredients;
};
export const ingredients = getAllIngredients();
