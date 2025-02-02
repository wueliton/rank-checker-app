import { PropsWithChildren } from "react";

function Error({ children }: PropsWithChildren) {
  return <div className="px-4 text-red-400 text-xs pt-1">{children}</div>;
}

export default Error;
