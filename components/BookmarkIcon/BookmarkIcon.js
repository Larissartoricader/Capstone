import React from "react";
import { StyledBookmarkIcon, StyledFilledHeart, StyledUnfilledHeart } from "./BookmarkIcon.styles";


export function BookmarkIcon({
  onToggleBookmark,
  recipe,
  bookmarkedRecipesIDs,
}) {
  function handleClick() {
    onToggleBookmark(recipe);
  }

  const isBookmarked = bookmarkedRecipesIDs.includes(recipe._id);

  return (
    <StyledBookmarkIcon onClick={handleClick}>
      {isBookmarked ? <StyledFilledHeart /> : <StyledUnfilledHeart />}
    </StyledBookmarkIcon>
  );
}
