import React from "react";
import styled from "styled-components";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

export const BookmarkIcon = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
`;

export const Bookmark = ({ isBookmarked, onClick }) => {
  return (
    <BookmarkIcon onClick={onClick} isBookmarked={isBookmarked}>
      {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
    </BookmarkIcon>
  );
};
