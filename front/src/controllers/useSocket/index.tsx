import { useEffect, useRef } from "react";
import {
  ListenerEvent,
  OnSendMessage,
  SocketListenersState,
  SocketState,
} from "./types";
import { SocketReceiveEventEnum } from "./constants";

function useSocketController() {
  const socketRef = useRef<SocketState>(null);
  const listeners = useRef<SocketListenersState>({
    onOpen: [],
    onMessage: [],
    onError: [],
    onClose: [],
  });

  const connect = () => {
    socketRef.current = new WebSocket("ws://localhost:3000");

    const socket = socketRef.current;
    const clients = listeners.current;

    socket.onopen = () => {
      console.log({ message: "conectado ao socket" });
      clients.onOpen.forEach((callback) =>
        callback({
          event: SocketReceiveEventEnum.CONNECT,
          data: { message: "Connected on Socket" },
        })
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      clients.onMessage.forEach((callback) => callback(data));
    };

    socket.onerror = (error) => {
      console.error({ message: error });
      clients.onError.forEach((callback) =>
        callback({
          event: SocketReceiveEventEnum.ERROR,
          data: { message: "Socket error" },
        })
      );
    };

    socket.onclose = () => {
      console.log({ message: "desconectado ao socket" });
      clients.onClose.forEach((callback) =>
        callback({
          event: SocketReceiveEventEnum.DISCONNECT,
          data: { message: "Disconnected socket" },
        })
      );

      setTimeout(() => connect(), 2000);
    };
  };

  const sendMessage: OnSendMessage = (event) => {
    socketRef.current?.send(JSON.stringify(event));
  };

  const addListener = <Event extends ListenerEvent>(
    event: Event,
    callback: SocketListenersState[Event][0]
  ) => {
    listeners.current[event].push(callback);
  };

  const removeListener = <Event extends ListenerEvent>(
    event: Event,
    callback: SocketListenersState[Event][0]
  ) => {
    listeners.current[event] = listeners.current[event].filter(
      (listener) => listener !== callback
    );
  };

  const disconnect = () => {
    socketRef.current?.close();
  };

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, []);

  return {
    sendMessage,
    addListener,
    removeListener,
  };
}

export default useSocketController;
