import { Static } from "@sinclair/typebox";
import { SearchKeyword } from "../schemas/search-keyword.schema";

type SearchKeywordType = Static<typeof SearchKeyword>;

export type { SearchKeywordType };
