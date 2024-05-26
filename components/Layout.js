import Head from "next/head.js";
import NavigationBar from "./NavigationBar/NavigationBar.js";
import { Header } from "./Header.js";
import styled from "styled-components";

const WhiteSpaceTop = styled.div`height: 90px;`

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
