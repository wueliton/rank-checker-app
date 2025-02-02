import useKeywordsSearch from "@contexts/useKeywordsSearch";
import LoadingKeywordsPosition from "./components/LoadingKeywordsPosition";
import PendingSearchDialog from "./components/PendingSearchDialog";
import RecaptchaDialog from "./components/RecaptchaDialog";
import SearchForm from "./components/SearchForm";
import PendingExportDialog from "./components/PendingExportDialog";
import ConnectionLosedDialog from "./components/ConnectionLosedDialog";

function Home() {
  const { isSearching } = useKeywordsSearch();

  return (
    <div className="flex flex-col gap-4">
      {isSearching ? <LoadingKeywordsPosition /> : <SearchForm />}
      <PendingSearchDialog />
      <RecaptchaDialog />
      <PendingExportDialog />
      <ConnectionLosedDialog />
    </div>
  );
}

export default Home;
