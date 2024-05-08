import React from "react";
import styled from "styled-components";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const StyledBookmarkIcon = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  top: 5px;
  right: 5px;
  font-size: 1.5em;
`;

export function BookmarkIcon({
  onHandleBookmarkedIcon,
  recipe,
  bookmarkedRecipesIDs,
}) {
  function handleClick() {
    onHandleBookmarkedIcon(recipe);
  }

  const isBookmarked = bookmarkedRecipesIDs.includes(recipe._id);

  return (
    <StyledBookmarkIcon onClick={handleClick}>
      {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
    </StyledBookmarkIcon>
  );
}
