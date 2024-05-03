import styled, { css } from "styled-components";
import { useRouter } from "next/router";

const StyledNav = styled.nav`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  width: 100%;
  padding: 1rem;
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

export default function NavigationBar() {
  const router = useRouter();

  const isActive = (path) => {
    return router.pathname === path;
  };

  return (
    <StyledNav>
      <StyledLink onClick={() => router.push("/")} active={isActive("/")}>
        Home
      </StyledLink>
      <StyledLink
        onClick={() => router.push("/recipe-form")}
        active={isActive("/recipe-form")}
      >
        Create
      </StyledLink>
      <StyledLink
        onClick={() => router.push("/bookmarks")}
        active={isActive("/bookmarks")}
      >
        Bookmarks
      </StyledLink>
    </StyledNav>
  );
}
