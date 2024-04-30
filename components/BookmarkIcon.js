import React from "react";
import styled from "styled-components";
import { FaBookmark, FaRegBookmark } from "react-icons";

const StyledBookmarkIcon = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
`;

export default function BookmarkIcon({
  onHandleBookmarkedIcon,
  recipe,
  bookmarkedRecipesIDs,
}) {
  function handleClick() {
    onHandleBookmarkedIcon(recipe);
  }

  const isBookmarked = bookmarkedRecipesIDs.includes(recipe.id);

  return (
    <StyledBookmarkIcon onClick={handleClick}>
      {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
    </StyledBookmarkIcon>
  );
}
