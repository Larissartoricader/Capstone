import styled from "styled-components";
import { RiArrowDropDownLine } from "react-icons/ri";
import Image from "next/image";

export const RecipeArticle = styled.article`
  background-color: var(--secondary-background-color);
  margin-inline: 15px;
  border-radius: var(--big-box-border-radius);
  position: relative;
  color: var(--font-color);
`;

export const StyledRecipeDetailPicture = styled.div`
  border-radius: 20px 20px 0 0;
  width: 100%;
  height: 180px;
  position: relative;
`;

export const StyledBookmarkIcon = styled.div`
  width: 40px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
`;

export const StyledImage = styled(Image)`
  border-radius: 20px 20px 0 0;
`;

export const SytledRecipeTitle = styled.h2`
  margin-left: 20px;
  font-size: xx-large;
`;

export const StyledItemsBox = styled.div`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 5px;
  padding-bottom: 10px;
`;

export const StyledItemListTitle = styled.h3`
  margin-left: 20px;
  font-size: medium;
`;

export const StyleItemsList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
`;

export const StyledItems = styled.li`
  background-color: var( --selected-value-color);
  border-radius: var( --small-box-border-radius);
  text-align: center;
  padding: 5px;
`;

export const CollapsibleContainer = styled.div`
  margin-bottom: 10px;
`;

export const CollapsibleButton = styled.div`
  background-color: #dedbdb;
  color: var(--font-color);
  cursor: pointer;
  padding: 2px;
  margin: 5px;
  border-radius: 7px;
  border: solid black 1px;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledIcon = styled(RiArrowDropDownLine)`
  font-size: 40px;
`;

export const StyledTextButton = styled.p`
  font-size: medium;
  text-align: center;
`;

export const CollapsibleContent = styled.div`
  padding: 0 18px;
  margin: 5px;
  overflow: hidden;
  background-color: #f1f1f1;
  max-height: ${(props) => (props.isOpen ? "500px" : "0")};
  transition: max-height 0.3s ease-out;
`;

export const CollapsibleText = styled.p`
  font-size: medium;
`;

export const StyledButton = styled.button`
  height: 32px;
  width: 64px;
  color: white;
  font-size: medium;
  border-radius: 7px;
  border: none;
  &:hover {
    background-color: #808080;
  }
`;

export const EditButton = styled(StyledButton)`
  background-color: var( --secondary-button-color);
  color: black;
  font-weight: bold;
`;

export const DeleteButton = styled(StyledButton)`
  background-color: #ff0000;
  font-weight: bold;
`;

export const ButtonsBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
  padding-bottom: 10px;
`;