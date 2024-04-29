import { getRecipes } from "@/lib/app-state";
import GlobalStyle from "../styles";

import { useState } from "react";
export default function App({ Component, pageProps }) {
  const loadedRecipes = getRecipes();
  const [recipes, updateRecipes] = useState(loadedRecipes);

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        recipes={recipes}
        updateRecipes={updateRecipes}
      />
    </>
  );
}
