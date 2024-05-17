import Head from "next/head.js";
import NavigationBar from "./NavigationBar.js";
import Login from "../components/Login.js";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Herbie: Guru of Health</title>
      </Head>
      <main>
        <Login />
        {children}
      </main>
      <NavigationBar />
    </>
  );
}
