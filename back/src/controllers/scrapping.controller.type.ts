interface PageLinksSearchProps {
  keyword: string;
  links: string[];
}

interface FindKeywordInPages {
  site: string;
  pageLinks: PageLinksSearchProps;
  searchFolder: string;
}

interface KeywordResult {
  title: string | null;
  link: string | null;
  keyword: string;
  page: number | null;
  position: number | null;
}

export type { PageLinksSearchProps, FindKeywordInPages, KeywordResult };
