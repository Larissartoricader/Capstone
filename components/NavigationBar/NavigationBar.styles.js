import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoHome, GoHomeFill } from "react-icons/go";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export  const StyledNav = styled.nav`
z-index: 2;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  width: 100%;
  padding: 0.5rem 1rem;
  background: #ffffff;
  color: var(--primary-button-and-header-color);
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
`;

export const StyledLink = styled.a`
width: 33%;
display: flex; justify-content: center;
  padding: 0.5rem 1rem;
  margin: 0 1rem;
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid var(--primary-button-and-header-color);
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      color: #ffffff;
      background-color: var(--primary-button-and-header-color);
      border: none;
    `}
`;

export const StyledLinkHeartAndHome = styled.a`
width: 33%;
  padding: 0.5rem 1rem;
  margin: 0 1rem;
  text-decoration: none;
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      color: #ffffff;
    `}
`;

export const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 30px;
`;

export const EmptyHomeIcon = styled(GoHome)`
  font-size: 30px;
`;

export const FilledHomeIcon = styled(GoHomeFill)`
  font-size: 30px;
  color: var(--primary-button-and-header-color);
`;

export const EmptyHeartIcon = styled(FaRegHeart)`
  font-size: 30px;
`;

export const FilledHeartIcon = styled(FaHeart)`
  font-size: 30px;
  color: var(--primary-button-and-header-color);
`;

export const MenuTitle = styled.p`
  font-size: 8px;
  color: var(--primary-button-and-header-color);
`;

export const MenuIconTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;