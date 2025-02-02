import SearchIcon from "@components/Icons/SearchIcon";

function Aside() {
  return (
    <div className="flex flex-col gap-6">
      <img src="rankchecker.png" alt="RankChecker Logo" className="size-12" />
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase font-bold text-black/40">Análise</p>
        <a
          href="#"
          className="flex gap-2 py-2 items-center text-blue-500 border-r-4 -mr-5 border-blue-600"
        >
          <SearchIcon className="size-6" />
          Busca de Palavras
        </a>
      </div>
    </div>
  );
}

export default Aside;
