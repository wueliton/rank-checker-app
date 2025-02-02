import { useEffect, useRef, useState } from "react";
import useSocket from "@controllers/useSocket";
import {
  SocketReceiveEventEnum,
  SocketSendEventEnum,
} from "@controllers/useSocket/constants";
import { EventType } from "@controllers/useSocket/types";
import { Buffer } from "buffer";

function useRecaptchaDialogController() {
  const { addListener, sendMessage } = useSocket();
  const resolveRecaptchaRef = useRef(false);
  const [isOpenState, setIsOpenState] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const onRecaptcha = (data: EventType[SocketReceiveEventEnum.RECAPTCHA]) => {
    setIsOpenState(true);

    const screenshot = data.screenshot;
    const buffer = Buffer.from(screenshot.data);
    const blob = new Blob([buffer]);
    const url = URL.createObjectURL(blob);
    renderCanvas(url);
  };

  const onCanvasClicked = (event: MouseEvent) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    sendMessage({ type: SocketSendEventEnum.CLICK, data: { x, y } });
  };

  const renderCanvas = (url: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0);
      URL.revokeObjectURL(url);
    };
    image.onerror = () => {
      console.log({ message: "Erro ao carregar" });
    };
    image.src = url;
  };

  useEffect(() => {
    addListener("onMessage", (socketEvent) => {
      if (!socketEvent) return;

      const { data, event } = socketEvent;

      if (event === SocketReceiveEventEnum.START_RECAPTCHA) {
        setIsOpenState(true);
        resolveRecaptchaRef.current = true;
        window.electron?.ipcRenderer?.send("focus-main-window");
      } else if (event === SocketReceiveEventEnum.RESOLVED_RECAPTCHA) {
        setIsOpenState(false);
        resolveRecaptchaRef.current = false;
      } else if (
        event === SocketReceiveEventEnum.RECAPTCHA &&
        resolveRecaptchaRef.current
      ) {
        onRecaptcha(data as EventType[SocketReceiveEventEnum.RECAPTCHA]);
      }
    });
  }, []);

  useEffect(() => {
    canvasRef.current?.addEventListener("click", onCanvasClicked);
  }, [canvasRef.current, onCanvasClicked]);

  return {
    canvasRef,
    isOpen: isOpenState,
  };
}

export default useRecaptchaDialogController;
