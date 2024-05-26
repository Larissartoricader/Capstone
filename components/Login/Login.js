import { useSession, signIn, signOut } from "next-auth/react";
import { LoginButton } from "./Login.styles";
import { FiLogOut, FiLogIn } from "react-icons/fi";



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
