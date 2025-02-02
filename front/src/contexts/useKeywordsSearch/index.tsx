import { useContext } from "react";
import { KeywordsSearchContext } from "./useKeywordsSearchContext";

function useKeywordsSearch() {
  const context = useContext(KeywordsSearchContext);

  if (!context) {
    throw new Error(
      "useKeywordsSearch só pode ser utilizado com acesso ao KeywordsSearchProvider"
    );
  }

  return context;
}

export default useKeywordsSearch;
