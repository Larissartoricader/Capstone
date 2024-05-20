import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";
import { useState } from "react";

const BurgerMenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 24px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  left: 10px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 1;
`;

const MenuItem = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  width: 100%;
  text-align: left;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const SignedIn = styled.p`
  font-size: x-small;
`;

export default function BurgerMenuComponent() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {session ? (
        <SignedIn>Signed in as {session.user.email}</SignedIn>
      ) : (
        <SignedIn></SignedIn>
      )}
      <BurgerMenuButton onClick={() => setMenuOpen(!menuOpen)}>
        &#9776;
      </BurgerMenuButton>

      {menuOpen && (
        <DropdownMenu>
          {session ? (
            <>
              <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
            </>
          ) : (
            <MenuItem onClick={() => signIn()}>Sign in</MenuItem>
          )}
        </DropdownMenu>
      )}
    </>
  );
}
