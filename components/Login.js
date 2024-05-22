import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";

const LoginButton = styled.button`color: white; background-color: hotpink;
border: none;`

export default function Login() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <LoginButton onClick={() => signOut()}>Sign out</LoginButton>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <LoginButton onClick={() => signIn()}>Sign in</LoginButton>
    </>
  );
}
