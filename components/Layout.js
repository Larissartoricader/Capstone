import Head from "next/head.js";
import NavigationBar from "./NavigationBar.js";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Herbie: Guru of Health</title>
      </Head>
      <main>{children}</main>
      <NavigationBar />
    </>
  );
}
