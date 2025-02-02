import { Type } from "@sinclair/typebox";

const GenerateExcelSchema = Type.Object({
  website: Type.String(),
  client: Type.String(),
  keywords: Type.Array(
    Type.Object({
      title: Type.Optional(Type.String()),
      link: Type.Optional(Type.String()),
      keyword: Type.Optional(Type.String()),
      page: Type.Optional(Type.Number()),
      position: Type.Optional(Type.Number()),
    })
  ),
});

export default GenerateExcelSchema;
