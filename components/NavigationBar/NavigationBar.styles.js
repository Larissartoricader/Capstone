import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoHome } from "react-icons/go";
import { CiHeart } from "react-icons/ci";

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
  padding: 0.5rem 1rem;
  margin: 0 1rem;
  text-decoration: none;
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      color: #ffffff;
      background-color: var(--primary-button-and-header-color);;
      border-radius: 5px;
    `}
`;

export const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 30px;
`;

export const StyledHomeIcon = styled(GoHome)`
  font-size: 30px;
`;

export const StyledHeartIcon = styled(CiHeart)`
  font-size: 30px;
`;

export const MenuTitle = styled.p`
  font-size: 8px;
`;

export const MenuIconTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;