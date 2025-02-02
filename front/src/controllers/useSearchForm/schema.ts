import * as yup from "yup";
import { ErrorMessages } from "@constants/Error-Messages";

const searchFormSchema = yup.object({
  client: yup.string().required(ErrorMessages.REQUIRED),
  site: yup
    .string()
    .required(ErrorMessages.REQUIRED)
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      ErrorMessages.INVALID_URL
    ),
  keywords: yup.string().required(ErrorMessages.REQUIRED),
});

export { searchFormSchema };
