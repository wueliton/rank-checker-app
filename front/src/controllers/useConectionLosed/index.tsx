import useSocket from "@contexts/useSocket";
import { useEffect, useState } from "react";

function useConectionLosedController() {
  const { addListener } = useSocket();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    addListener("onClose", () => {
      setIsOpen(true);
    });

    addListener("onOpen", () => {
      setIsOpen(false);
    });
  }, []);

  return {
    isOpen,
  };
}

export default useConectionLosedController;
