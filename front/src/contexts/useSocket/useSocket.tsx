import { createContext, PropsWithChildren } from "react";
import useSocketController from "../../controllers/useSocket";
import { UseSocketContextValue } from "./types";

const SocketContext = createContext({} as UseSocketContextValue);

function SocketProvider({ children }: PropsWithChildren) {
  const { sendMessage, addListener, removeListener } = useSocketController();

  return (
    <SocketContext.Provider
      value={{ addListener, sendMessage, removeListener }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export { SocketContext, SocketProvider };
