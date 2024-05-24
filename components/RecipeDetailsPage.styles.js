import styled from "styled-components";
import Link from "next/link";
import { GoStarFill } from "react-icons/go";

export const StyledRecipeHeader = styled.div`
 display: flex;
  padding-right: 10px;
  justify-content: space-between;
  align-items: center;
`;

export const BackLink = styled(Link)`
  background-color: #fcfbf4;
  padding: 10px;
  margin-left: 20px;
  border-radius: 15px;
  width: 10%;
  height: 10%;
  color: black;
  text-align: center;
  font-weight: bold;
`;

export const StyledRecipeBy = styled.p`
  font-size: small;
`;

export const StyledHerbie = styled.p`
  font-size: large;
  font-family: var(--herbie-font);
`;

export const StyledHerbieBox = styled.div`
  display: flex;
  gap: 3px;
  align-items: center;
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

export const ContentContainer = styled.div`
  margin-top: 3px;
`;

export const WhiteSpace = styled.div`
  height: 20vh;
`;