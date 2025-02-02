import useKeywordListProgressController from "@controllers/useKeywordListProgress";
import ProgressBar from "@presentation/components/ProgressBar";

function KeywordsListProgress() {
  const { progressPercent, currentCount, totalCount, client } =
    useKeywordListProgressController();

  return (
    <div className="flex flex-col gap-2 p-4 rounded shadow">
      <div>
        <p className="text-black/80 font-black">{client}</p>
        <p className="text-xs text-black/60">Ranqueando palavras chave...</p>
      </div>
      <ProgressBar
        progress={progressPercent}
        hint={
          <>
            Palavra chave {currentCount} de {totalCount}
          </>
        }
      />
    </div>
  );
}

export default KeywordsListProgress;
