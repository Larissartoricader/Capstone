import Link from "next/link";
import styled from "styled-components";

const StyledNav = styled.nav`
  padding: 1rem;
  background: #f0f0f0;
`;

const StyledLink = styled.a`
  padding: 0.5rem;
  margin-right: 1rem;
  color: #333;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default function NavigationBar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/bookmarks">Bookmarks</Link>
    </nav>
  );
}
