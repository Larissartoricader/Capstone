import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";
import { FiLogOut, FiLogIn } from "react-icons/fi";

const LoginButton = styled.button`
width: 50%;
display: flex; 
gap: 7px;
color: white; background-color: var(--primary-button-and-header-color);
border: none; font-family: var(--general-font); font-size: 120%;
padding-left: 3%;`

export default function Login() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <LoginButton onClick={() => signOut()}><FiLogOut />Logout</LoginButton>
      </>
    );
  };
  return (
    <>
      <LoginButton onClick={() => signIn()}><FiLogIn/>Login</LoginButton>
    </>
  );
}
