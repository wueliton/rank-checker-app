import {
  KeywordsSearchState,
  SearchProps,
} from "@controllers/useKeywordsSearch/types";

interface KeywordsSearchContextValue {
  keywordsSearch: KeywordsSearchState;
  isSearching: boolean;
  startSearch: (props: SearchProps) => void;
  reset: () => void;
}

export type { KeywordsSearchContextValue };
