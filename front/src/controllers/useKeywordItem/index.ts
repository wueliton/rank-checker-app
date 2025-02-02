import { UseKeywordItemProps } from "./types";

function useKeywordItemController({ data }: UseKeywordItemProps) {
  const item = {
    ...data,
    status: data.isLoading
      ? "-"
      : data.position
      ? "Encontrada"
      : "Não encontrada",
    isLoading: Boolean(data.isLoading),
    founded: Boolean(data.position),
  };

  return {
    item,
  };
}

export default useKeywordItemController;
