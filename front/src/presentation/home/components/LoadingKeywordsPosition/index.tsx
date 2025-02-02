import KeywordListTable from "./components/KeywordListTable";
import KeywordsListProgress from "./components/KeywordsListProgress";

function LoadingKeywordsPosition() {
  return (
    <>
      <h1 className="text-4xl font-bold">Fila de Ranqueamento</h1>
      <div className="flex flex-col gap-4">
        <KeywordsListProgress />
        <KeywordListTable />
      </div>
    </>
  );
}

export default LoadingKeywordsPosition;
