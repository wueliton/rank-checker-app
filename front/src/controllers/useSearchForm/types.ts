import { InferType } from "yup";
import { searchFormSchema } from "./schema";

type SubmitKeywordsHandler = InferType<typeof searchFormSchema>;

export type { SubmitKeywordsHandler };
