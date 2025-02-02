import { twMerge } from "tailwind-merge";
import DialogActions from "./Components/DialogActions";
import DialogContent from "./Components/DialogContent";
import DialogIcon from "./Components/DialogIcon";
import { DialogProps } from "./types";
import { useEffect, useState } from "react";

function Dialog({ children, isOpen, className }: DialogProps) {
  const [isOpenState, setIsOpenState] = useState(false);
  const openClass = isOpenState ? "opacity-100 translate-y-0" : "";

  useEffect(() => {
    setTimeout(() => {
      setIsOpenState(isOpen);
    }, 1);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={twMerge(
        "bg-black/40 opacity-0 transition-all fixed left-0 top-0 h-full w-full flex items-center justify-center -translate-y-6 duration-300",
        openClass
      )}
      tabIndex={-1}
    >
      <div
        className={twMerge(
          "m-10 bg-white p-6 rounded-md flex items-center flex-col gap-6 w-full max-w-lg shadow-xl transition-discrete starting:open:opacity-0 max-h-full",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

Dialog.Icon = DialogIcon;
Dialog.Content = DialogContent;
Dialog.Actions = DialogActions;

export default Dialog;
