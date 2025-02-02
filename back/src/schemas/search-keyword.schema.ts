import { Type } from "@sinclair/typebox";

const SearchKeyword = Type.Object({
  keywords: Type.Array(Type.String()),
  site: Type.String(),
});

export { SearchKeyword };
