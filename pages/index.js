import FilterForm from "@/components/FilterForm";

import Link from "next/link";

export default function HomePage({
  recipes,
  bookmarkedRecipesIDs,
  onHandleBookmarkedIcon,
}) {
  return (
    <div>
      <Link href={"/recipe-form"}>Create</Link>
      <FilterForm
        recipes={recipes}
        bookmarkedRecipesIDs={bookmarkedRecipesIDs}
        onHandleBookmarkedIcon={onHandleBookmarkedIcon}
      />
    </div>
  );
}
