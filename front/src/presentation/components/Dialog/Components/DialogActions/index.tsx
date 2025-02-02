import { PropsWithChildren } from "react";

function DialogActions({ children }: PropsWithChildren) {
  return <div className="flex gap-2 justify-end w-full">{children}</div>;
}

export default DialogActions;
