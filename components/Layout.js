import Head from "next/head.js";
import NavigationBar from "./NavigationBar.js";
import { Header } from "./Header.js";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Herbie: Guru of Health</title>
      </Head>
      <Header/>
      <main>
        {children}
      </main>
      <NavigationBar />
    </>
  );
}
