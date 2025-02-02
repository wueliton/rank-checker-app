import { HTTPErrorCode } from "./http-error.type";

class HttpError extends Error {
  code: HTTPErrorCode;

  constructor(code: HTTPErrorCode, message: string) {
    super(message);
    this.code = code;
  }
}

export default HttpError;
