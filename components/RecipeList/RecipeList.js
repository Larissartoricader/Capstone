import RecipeCard from "../RecipeCard/RecipeCard";
import { StyledList, WhiteSpaceBottom } from "../RecipeList/RecipeList.styles"

export default function RecipeList({
  recipes,
  onToggleBookmark,
  bookmarkedRecipesIDs,
}) {
  const sortedRecipes = recipes.sort((a, b) => {
    if (a._id > b._id) return -1;
    if (a._id < b._id) return 1;
    return 0;
  });

  return (
    <>
      <StyledList>
        {sortedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <RecipeCard
              onToggleBookmark={onToggleBookmark}
              bookmarkedRecipesIDs={bookmarkedRecipesIDs}
              recipe={recipe}
              aria-label={`Recipe card for ${recipe.title}`}
            />
          </li>
        ))}
      </StyledList>
      <WhiteSpaceBottom />
    </>
  );
}
