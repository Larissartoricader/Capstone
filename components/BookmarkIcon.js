import React from "react";
import styled from "styled-components";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

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

  return <StyledBookmarkIcon></StyledBookmarkIcon>;
}
