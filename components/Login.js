import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";
import { FiLogOut, FiLogIn } from "react-icons/fi";

const LoginButton = styled.button`
width: 25%;
display: flex; justify-content: space-evenly;
color: white; background-color: var(--primary-button-and-header-color);
border: none; font-family: var(--general-font); font-size: 100%;`

export default function Login() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <LoginButton onClick={() => signOut()}><FiLogOut />Logout</LoginButton>
      </>
    );
  }
  return (
    <>
      <LoginButton onClick={() => signIn()}><FiLogIn/>Login</LoginButton>
    </>
  );
}
