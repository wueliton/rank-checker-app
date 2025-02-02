import { KeywordResult } from "../controllers/scrapping.controller.type";

enum SocketSendEventEnum {
  START_RECAPTCHA = "start_recaptcha",
  RECAPTCHA = "recaptcha",
  RESOLVED_RECAPTCHA = "resolved_recaptcha",
  KEYWORD_RESULT = "keyword_result",
  SEARCH_END = "search_end",
}

type EventType = {
  [SocketSendEventEnum.START_RECAPTCHA]: {
    message: string;
  };
  [SocketSendEventEnum.RECAPTCHA]: {
    /** Send base64 screenshot to receive mouse events and client resolve recaptcha challenge */
    screenshot: { type: "Buffer"; data: number[] };
  };
  [SocketSendEventEnum.RESOLVED_RECAPTCHA]: { message: string };
  [SocketSendEventEnum.KEYWORD_RESULT]: KeywordResult[];
  [SocketSendEventEnum.SEARCH_END]: { message: string };
};

enum MessagesTypesEnum {
  CLICK = "click",
}

type MessageType = {
  [MessagesTypesEnum.CLICK]: {
    x: number;
    y: number;
  };
};

type OnReceiveMessage<T> = (data: T) => void;

type Message<T extends MessagesTypesEnum> = {
  type: MessagesTypesEnum;
  data: MessageType[T];
};

type OnMessageFn = <T extends MessagesTypesEnum>(params: Message<T>) => void;

export {
  SocketSendEventEnum,
  EventType,
  Message,
  MessageType,
  MessagesTypesEnum,
  OnMessageFn,
  OnReceiveMessage,
};
