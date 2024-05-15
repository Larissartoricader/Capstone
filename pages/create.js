import RecipeForm from "@/components/RecipeForm";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function CreateRecipePage({}) {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: recipes,
    isLoading,
    error,
 
  } = useSWR(`/api/recipes`);

  if (isLoading ) {
    return <h1>Loading ...</h1>;
  }

  if (error) {
    return <h1>Oops! Something went wrong..</h1>;
  }

  return (
    <>
      <RecipeForm recipes={recipes}/>
    </>
  );
}
