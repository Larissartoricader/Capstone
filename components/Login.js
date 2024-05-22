import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";
import { MdLogin, MdLogout } from "react-icons/md";

const LoginButton = styled.button`
color: white; background-color: var(--primary-button-and-header-color);
border: none; font-family: var(--geberal-font); font-size: 100%;`

export default function Login() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <LoginButton onClick={() => signOut()}>Logout <MdLogout /></LoginButton>
      </>
    );
  }
  return (
    <>
      <LoginButton onClick={() => signIn()}>Login <MdLogin /></LoginButton>
    </>
  );
}
