import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import { GoHome } from "react-icons/go";
import { CiHeart } from "react-icons/ci";

const StyledNav = styled.nav`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  width: 100%;
  padding: 0.5rem 1rem;
  background: #ffffff;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledLink = styled.a`
  padding: 0.5rem 1rem;
  margin: 0 1rem;
  text-decoration: none;
  cursor: pointer;

  ${(props) =>
    props.active &&
    css`
      color: #ffffff;
      background-color: #000000;
      border-radius: 5px;
    `}
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 30px;
`;

const StyledHomeIcone = styled(GoHome)`
  font-size: 30px;
`;

const StyledHeartIcone = styled(CiHeart)`
  font-size: 30px;
`;

const MenuTitle = styled.p`
  font-size: 8px;
`;

const MenuIconeTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function NavigationBar() {
  const router = useRouter();

  const { data: session } = useSession();

  const isActive = (path) => {
    return router.pathname === path;
  };

  return (
    <StyledNav>
      <StyledLink onClick={() => router.push("/")} active={isActive("/")}>
        <MenuIconeTitleBox>
          <StyledHomeIcone />
          <MenuTitle>HOME</MenuTitle>
        </MenuIconeTitleBox>
      </StyledLink>
      {session && (
        <StyledLink
          onClick={() => router.push("/create")}
          active={isActive("/create")}
        >
          <StyledIcon icon={faPlus} />
        </StyledLink>
      )}
      <StyledLink
        onClick={() => router.push("/bookmarks")}
        active={isActive("/bookmarks")}
      >
        <MenuIconeTitleBox>
          <StyledHeartIcone />
          <MenuTitle>FAVORITES</MenuTitle>
        </MenuIconeTitleBox>
      </StyledLink>
    </StyledNav>
  );
}
