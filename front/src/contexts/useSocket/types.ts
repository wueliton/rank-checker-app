import {
  ListenerEvent,
  OnSendMessage,
  SocketListenersState,
} from "../../controllers/useSocket/types";

interface UseSocketContextValue {
  sendMessage: OnSendMessage;
  addListener: <Event extends ListenerEvent>(
    event: Event,
    callback: SocketListenersState[Event][0]
  ) => void;
  removeListener: <Event extends ListenerEvent>(
    event: Event,
    callback: SocketListenersState[Event][0]
  ) => void;
}

export type { UseSocketContextValue };
