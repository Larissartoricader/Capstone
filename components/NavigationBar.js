import Link from "next/link";
import styled from "styled-components";

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
`;

export default function NavigationBar() {
  return (
    <StyledNav>
      <StyledLink href="/">Home</StyledLink>
      <StyledLink href="/bookmarks">Bookmarks</StyledLink>
    </StyledNav>
  );
}
