import Head from "next/head.js";
import NavigationBar from "./NavigationBar.js";
import { Header } from "./Header.js";
import { WhiteSpace } from "./RecipeForm.styles.js";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Herbie: Guru of Health</title>
      </Head>
      <Header/>
      <WhiteSpace/>
      <main>
        {children}
      </main>
      <NavigationBar />
    </>
  );
}
