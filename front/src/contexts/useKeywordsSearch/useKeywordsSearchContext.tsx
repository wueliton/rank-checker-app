import { createContext, PropsWithChildren } from "react";
import { KeywordsSearchContextValue } from "./types";
import useKeywordsSearchController from "@controllers/useKeywordsSearch";

const KeywordsSearchContext = createContext({} as KeywordsSearchContextValue);

function KeywordsSearchProvider({ children }: PropsWithChildren) {
  const { isSearching, keywordsSearch, resetSearch, startSearch } =
    useKeywordsSearchController();

  return (
    <KeywordsSearchContext.Provider
      value={{
        keywordsSearch,
        isSearching,
        startSearch,
        reset: resetSearch,
      }}
    >
      {children}
    </KeywordsSearchContext.Provider>
  );
}

export { KeywordsSearchProvider, KeywordsSearchContext };
