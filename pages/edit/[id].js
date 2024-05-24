import RecipeForm from "@/components/RecipeForm";
import { useRouter } from "next/router";
import useSWR from "swr";



export default function EditRecipePage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: currentRecipe,
    isLoading,
    error,
  } = useSWR(`/api/recipes/${id || ""}`);

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  if (error) {
    return <h1>Oops! Something went wrong..</h1>;
  }

  return <RecipeForm recipeToEdit={currentRecipe} />;
}
