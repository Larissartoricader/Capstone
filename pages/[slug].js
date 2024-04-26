import { useRouter } from "next/router";
import { remedies } from "../lib/remedies";

export default function RecipeDetails() {
  const router = useRouter();
  const { id } = router.query;

  const currentRemedy = remedies.find((remedy) => remedy.id === id);

  if (!currentRemedy) {
    return <p>Recipe not found</p>;
  }
  const { title, ingredients, preparation, usage, symptoms } = currentRemedy;

  return (
    <>
      <h2>Recipe Details</h2>
      <p>Title: {title}</p>
      <p>Ingredients: {ingredients.join(", ")}</p>
      <p>Preparation: {preparation}</p>
      <p>Usage: {usage}</p>
      <p>Symptoms: {symptoms.join(", ")}</p>
    </>
  );
}
