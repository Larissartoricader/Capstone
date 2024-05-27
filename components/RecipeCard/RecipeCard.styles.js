import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { GoStarFill } from "react-icons/go";

export const StyledArticle = styled.article`
  display: grid;
  grid-template-columns: 4fr 3fr;
  height: 40vh;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  @media only screen and (min-width: 580px) {
    height: 30vh;
  }
  @media only screen and (min-width: 1200px) {
    height: 30vh;
  }
`;

export const ReadMoreLink = styled(Link)`
  color: black;
  text-decoration: none;
  display: block;
  height: 100%;
`;


export const WrapperBookmarkIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const StyledImageWrapper = styled.div`
  border-radius: 0 20px 20px 0;
  position: relative;
  overflow: hidden;
`;

export const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;


export const StyledContentWrapper = styled.div`
  background-color: #fcfbf4;
  border-radius: 20px 0 0 20px;
  position: relative;
`;

export const StyledInfoBox = styled.div`
  margin-left: 10px;
  color: var(--font-color);
`;

export const StyledHeader = styled.p`
  font-weight: bold;
  font-size: large;
  padding-inline: 5px;
`;

export const AuthorBox = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  position: absolute;
  bottom: -9px;
  left: 1px;
  font-size: small;
  margin-left: 10px;
  color: var(--font-color);
`;

export const StyledRecipeBy = styled.p`
  font-size: small;
`;

export const StyledHerbie = styled.p`
  font-size: medium;
  color: var(--font-color);
  font-weight: bold;
  font-family: var(--herbie-font);
`;

export const StyleItemsList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 7px;
  padding: 5px;
`;

export const StyledItems = styled.li`
  background-color: var(--selected-value-color);
  border-radius: 10px;
  padding: 5px;
  font-size: medium;
`;

export const StyledStar = styled(GoStarFill)`
  color: #ffa62f;
  font-size: 20px;
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3));
`;

export const HerbieStarBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1px;
`;
