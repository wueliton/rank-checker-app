interface KeywordResult {
  title: string | null;
  link: string | null;
  keyword: string;
  page: number | null;
  position: number | null;
}

interface KeywordsSearchState {
  client?: string;
  website?: string;
  keywords?: string[];
  keywordsRanked?: KeywordResult[];
}

interface SearchProps {
  client: string;
  site: string;
  keywords: string[];
}

export type { KeywordResult, KeywordsSearchState, SearchProps };
