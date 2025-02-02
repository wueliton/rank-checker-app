enum SocketReceiveEventEnum {
  CONNECT = "connect",
  START_RECAPTCHA = "start_recaptcha",
  RECAPTCHA = "recaptcha",
  RESOLVED_RECAPTCHA = "resolved_recaptcha",
  KEYWORD_RESULT = "keyword_result",
  SEARCH_END = "search_end",
  DISCONNECT = "disconnect",
  ERROR = "error",
}

enum SocketSendEventEnum {
  CLICK = "click",
}

export { SocketReceiveEventEnum, SocketSendEventEnum };
