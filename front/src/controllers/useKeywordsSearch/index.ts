import { useEffect, useState } from "react";
import { KeywordResult, KeywordsSearchState, SearchProps } from "./types";
import { KEYWORDS_STATE_LOCAL_STORAGE } from "./constants";
import useSocket from "@contexts/useSocket";
import { OnReceiveMessage } from "@controllers/useSocket/types";
import { SocketReceiveEventEnum } from "@controllers/useSocket/constants";

const initialValue = () => {
  const data =
    window.localStorage.getItem(KEYWORDS_STATE_LOCAL_STORAGE) ?? "{}";
  return JSON.parse(data);
};

function useKeywordsSearchController() {
  const { addListener, removeListener } = useSocket();
  const [keywordsSearchState, setKeywordsSearchState] =
    useState<KeywordsSearchState>(initialValue());
  const [isSearchingState, setIsSearchingState] = useState(false);

  const onSocketMessage: OnReceiveMessage = ({ event, data }) => {
    if (event === SocketReceiveEventEnum.KEYWORD_RESULT) {
      const keywordResult = data as KeywordResult[];
      setKeywordsSearchState((prev) => {
        const newState = {
          ...prev,
          keywordsRanked: keywordResult,
          keywords: prev.keywords?.filter(
            (keyword) =>
              !keywordResult.some((result) => result.keyword === keyword)
          ),
        };

        window.localStorage.setItem(
          KEYWORDS_STATE_LOCAL_STORAGE,
          JSON.stringify(newState)
        );

        return newState;
      });

      setIsSearchingState(true);
    }

    if (event === SocketReceiveEventEnum.SEARCH_END) {
      setIsSearchingState(false);
    }
  };

  const startSearch = ({ client, site, keywords }: SearchProps) => {
    const newState = {
      client,
      website: site,
      keywords,
      keywordsRanked: [],
    };
    setKeywordsSearchState(newState);
    window.localStorage.setItem(
      KEYWORDS_STATE_LOCAL_STORAGE,
      JSON.stringify(newState)
    );
    setIsSearchingState(true);
  };

  const resetSearch = () => {
    setKeywordsSearchState({});
    window.localStorage.removeItem(KEYWORDS_STATE_LOCAL_STORAGE);
  };

  useEffect(() => {
    addListener("onMessage", onSocketMessage);

    return () => {
      removeListener("onMessage", onSocketMessage);
    };
  }, []);

  return {
    keywordsSearch: keywordsSearchState,
    isSearching: isSearchingState,
    startSearch,
    resetSearch,
  };
}

export default useKeywordsSearchController;
