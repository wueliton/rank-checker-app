import useKeywordsSearch from "@contexts/useKeywordsSearch";
import { useMemo } from "react";

function useKeywordListTableController() {
  const { keywordsSearch } = useKeywordsSearch();
  const searchState = [...(keywordsSearch.keywordsRanked ?? [])].reverse();
  const currentKeywordLoading = [...(keywordsSearch.keywords ?? [])].shift();

  const tableData = useMemo(
    () => [
      ...(currentKeywordLoading
        ? [
            {
              keyword: currentKeywordLoading,
              title: null,
              link: null,
              url: null,
              page: null,
              position: null,
              isLoading: true,
            },
          ]
        : []),
      ...(searchState ?? []),
    ],
    [searchState, currentKeywordLoading]
  );

  return {
    tableData,
  };
}

export default useKeywordListTableController;
