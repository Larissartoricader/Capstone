import React from "react";
import styled from "styled-components";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

export default function BookmarkIcon({
  onHandleBookmarkedIcon,
  recipes,
  bookmarkedRecipesIDs,
}) {
  const StyledBookmarkIcon = styled.button`
    border: none;
    cursor: pointer;
    background-color: transparent;
  `;

  function handleClick() {
    onHandleBookmarkedIcon(recipes);
  }

  return (
    <BookmarkIcon onClick={handleClick}>
      {bookmarkedRecipesIDs.includes(recipes.id) ? (
        <FaBookmark />
      ) : (
        <FaRegBookmark />
      )}
    </BookmarkIcon>
  );
}
