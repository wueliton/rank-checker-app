import { KeywordsSearchProvider } from "@contexts/useKeywordsSearch/useKeywordsSearchContext";
import { SocketProvider } from "@contexts/useSocket/useSocket";
import Aside from "@components/Aside";
import Header from "@components/Header";
import { HomeLayoutProps } from "./types";

function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <SocketProvider>
      <KeywordsSearchProvider>
        <div className="flex min-h-full">
          <div className="p-5 border-r border-black/15 w-60 min-h-full max-md:hidden">
            <Aside />
          </div>
          <main className="flex flex-col gap-8 flex-1 p-5">
            <Header />
            {children}
          </main>
        </div>
      </KeywordsSearchProvider>
    </SocketProvider>
  );
}

export default HomeLayout;
