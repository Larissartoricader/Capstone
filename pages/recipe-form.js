import RecipeForm from "@/components/RecipeForm";
import Link from "next/link";

export default function RecipeFormPage() {
  return (
    <>
      <RecipeForm />
      <Link href={"./"}>Back</Link>
    </>
  );
}
