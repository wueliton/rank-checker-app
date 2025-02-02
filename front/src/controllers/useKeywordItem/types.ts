import { KeywordResult } from "@controllers/useKeywordsSearch/types";

interface UseKeywordItemProps {
  data: KeywordResult & { isLoading?: boolean };
}

export type { UseKeywordItemProps };
