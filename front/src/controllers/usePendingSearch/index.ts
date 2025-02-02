import useKeywordsSearch from "@contexts/useKeywordsSearch";
import useApi from "@services/api";
import { useEffect } from "react";

function usePendingSearchController() {
  const {
    isSearching,
    keywordsSearch: { client, keywords, website },
    startSearch,
    reset,
  } = useKeywordsSearch();
  const { post } = useApi();
  const hasPendingSearch = !isSearching && Boolean(keywords?.length);

  const searchData = {
    client: client,
    website: website,
    keywordsLength: keywords?.length,
  };

  const onContinueSearch = async () => {
    if (!client || !website || !keywords?.length) return;

    try {
      await post({
        url: "/search",
        body: {
          client,
          site: website,
          keywords,
        },
      });

      startSearch({ keywords: keywords, client, site: website });
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (hasPendingSearch) {
      window.electron?.ipcRenderer?.send("focus-main-window");
    }
  }, [hasPendingSearch]);

  return {
    hasPendingSearch,
    onDecline: reset,
    onContinueSearch,
    ...searchData,
  };
}

export default usePendingSearchController;
