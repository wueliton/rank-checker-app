import { useContext } from "react";
import { SocketContext } from "./useSocket";

function useSocket() {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error(
      "useSocket só pode ser utilizado com acesso ao SocketProvider"
    );
  }

  return context;
}

export default useSocket;
