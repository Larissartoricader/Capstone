import React from "react";
import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const StyledBookmarkIcon = styled.button`
  border: none;
  cursor: pointer;
  background-color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;

  & > svg {
    alt: ${({ isBookmarked }) =>
      isBookmarked ? "Bookmarked" : "Not Bookmarked"};
  }
`;

const StyledFilledHeart = styled(FaHeart)`
  color: red;
`;

const StyledUnfilledHeart = styled(FaRegHeart)`
  color: red;
`;

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
    <StyledBookmarkIcon
      onClick={handleClick}
      aria-label={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
    >
      {isBookmarked ? (
        <StyledFilledHeart alt="Bookmarked" />
      ) : (
        <StyledUnfilledHeart alt="Not Bookmarked" />
      )}
    </StyledBookmarkIcon>
  );
}
