import { KeywordResult } from "@controllers/useKeywordsSearch/types";

interface KeywordListItemProps {
  data: KeywordResult & { isLoading?: boolean };
}

export type { KeywordListItemProps };
