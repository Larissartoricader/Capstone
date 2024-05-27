import Head from "next/head.js";
import NavigationBar from "../NavigationBar/NavigationBar.js";
import { Header } from "../Header/Header.js";
import { WhiteSpaceTop } from "./Layout.styles.js";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Herbie: Guru of Health</title>
      </Head>
      <Header/>
      <WhiteSpaceTop/>
      <main>
        {children}
      </main>
      <NavigationBar />
    </>
  );
}
