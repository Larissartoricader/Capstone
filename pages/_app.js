import GlobalStyle from "@/components/GlobalStyles";
import { SWRConfig } from "swr";
import useLocalStorageState from "use-local-storage-state";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/Layout";
import { SessionProvider } from "next-auth/react";
import { useRef, useState } from "react";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("An error occurred while trying to fetch");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export default function App({ Component, pageProps }) {
  const [bookmarkedRecipesIDs, setBookmarkedRecipesIDs] = useLocalStorageState(
    "bookmarkedRecipesIDs",
    { defaultValue: [] }
  );

  function checkIfRecipeIsBookmarked(id) {
    return bookmarkedRecipesIDs.includes(id);
  }

  function addRecipeToBookmarked(id) {
    setBookmarkedRecipesIDs([id, ...bookmarkedRecipesIDs]);
  }

  function removeRecipeFromBookmarked(id) {
    const recipeIsBookmarkedWithoutCertainID = bookmarkedRecipesIDs.filter(
      (item) => item !== id
    );
    setBookmarkedRecipesIDs(recipeIsBookmarkedWithoutCertainID);
  }

  function handleBookmarkedIcon(recipe) {
    const id = recipe._id;
    checkIfRecipeIsBookmarked(id)
      ? removeRecipeFromBookmarked(id)
      : addRecipeToBookmarked(id);
  }
  const modalRef = useRef();

  const [modalInfo, setModalInfo] = useState({
    message: "",
    textButtonClose: "",
    textButtonConfirm: "",
    onConfirm: () => {},
    onClose: () => {},
  });

  const openModal = ({
    message,
    textButtonClose,
    textButtonConfirm,
    onConfirm,
  }) => {
    const onClose = () => {
      modalRef.current.close();
    };
    setModalInfo({
      message,
      textButtonClose,
      textButtonConfirm,
      onConfirm,
      onClose,
    });
    modalRef.current.showModal();
  };

  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig value={{ fetcher }}>
        <GlobalStyle />
        <Layout>
          <ToastContainer />
          <Component
            {...pageProps}
            onToggleBookmark={handleBookmarkedIcon}
            bookmarkedRecipesIDs={bookmarkedRecipesIDs}
            openModal={openModal}
            modalInfo={modalInfo}
            modalRef={modalRef}
          />
        </Layout>
      </SWRConfig>
    </SessionProvider>
  );
}

function Auth({ children }) {
  const { status } = useSession({ required: true });
  if (status === "loading") {
    return <div>Is loading...</div>;
  }
  return children;
}
