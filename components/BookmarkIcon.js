import React from "react";
// import styled from "styled-components";

// const StyledBookmarkIcon = styled.button`
//   border: none;
//   cursor: pointer;
//   background-color: transparent;
// `;

export default function BookmarkIcon({
  onHandleBookmarkedIcon,
  recipe,
  bookmarkedRecipesIDs,
}) {
  function handleClick() {
    onHandleBookmarkedIcon(recipe);
  }

  return (
    <button onClick={handleClick}>
      {bookmarkedRecipesIDs.includes(recipe.id) ? "Included" : "Not Included"}
    </button>
  );
}
