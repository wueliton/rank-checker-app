import useKeywordsSearch from "@contexts/useKeywordsSearch";

function useKeywordListProgressController() {
  const {
    keywordsSearch: { keywords, keywordsRanked, client, website },
  } = useKeywordsSearch();

  const rankedKeywordsLength = keywordsRanked?.length || 0;
  const keywordsLength = keywords?.length || 0;
  const totalKeywords = rankedKeywordsLength + keywordsLength;
  const keywordsPercentage = 100 / totalKeywords;
  const progressPercent = rankedKeywordsLength * keywordsPercentage;

  return {
    progressPercent,
    currentCount: rankedKeywordsLength,
    totalCount: totalKeywords,
    client,
    website,
  };
}

export default useKeywordListProgressController;
