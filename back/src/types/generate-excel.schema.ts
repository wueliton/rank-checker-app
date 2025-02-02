import { Static } from "@sinclair/typebox";
import GenerateExcelSchema from "../schemas/generate-excel.schema";

type GenerateExcelType = Static<typeof GenerateExcelSchema>;

export type { GenerateExcelType };
