import { KeywordResult } from "@controllers/useKeywordsSearch/types";
import { SocketReceiveEventEnum, SocketSendEventEnum } from "./constants";

type SocketState = WebSocket | null;

type EventType = {
  [SocketReceiveEventEnum.CONNECT]: {
    message: string;
  };
  [SocketReceiveEventEnum.DISCONNECT]: {
    message: string;
  };
  [SocketReceiveEventEnum.ERROR]: {
    message: string;
  };
  [SocketReceiveEventEnum.START_RECAPTCHA]: {
    message: string;
  };
  [SocketReceiveEventEnum.RECAPTCHA]: {
    /** Send base64 screenshot to receive mouse events and client resolve recaptcha challenge */
    screenshot: { type: "Buffer"; data: number[] };
  };
  [SocketReceiveEventEnum.RESOLVED_RECAPTCHA]: {
    message: string;
  };
  [SocketReceiveEventEnum.KEYWORD_RESULT]: KeywordResult[];
  [SocketReceiveEventEnum.SEARCH_END]: { message: string };
};

type SendEventType = {
  [SocketSendEventEnum.CLICK]: {
    x: number;
    y: number;
  };
};

type OnReceiveMessage<
  Event extends SocketReceiveEventEnum = SocketReceiveEventEnum
> = (event: { event: Event; data: EventType[Event] }) => void;

type OnSendMessage<Event extends SocketSendEventEnum = SocketSendEventEnum> =
  (event: { type: Event; data: SendEventType[Event] }) => void;

interface SocketListenersState {
  onOpen: OnReceiveMessage[];
  onMessage: OnReceiveMessage[];
  onError: OnReceiveMessage[];
  onClose: OnReceiveMessage[];
}

type ListenerEvent = keyof SocketListenersState;

export type {
  SocketListenersState,
  SocketState,
  ListenerEvent,
  EventType,
  OnReceiveMessage,
  OnSendMessage,
};
