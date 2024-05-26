import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

export const StyledBookmarkIcon = styled.button`
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
`;

export const StyledFilledHeart = styled(FaHeart)`
  color: red;
`;

export const StyledUnfilledHeart = styled(FaRegHeart)`
  color: red;
`;