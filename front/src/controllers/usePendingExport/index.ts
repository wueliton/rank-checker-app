import useKeywordsSearch from "@contexts/useKeywordsSearch";
import useApi from "@services/api";
import { useEffect, useState } from "react";
import { RequestState } from "./types";

function usePendingExportController() {
  const { postBuffer } = useApi();
  const { isSearching, keywordsSearch, reset } = useKeywordsSearch();
  const [downloadRequestState, setDownloadRequestState] =
    useState<RequestState>({
      isLoading: false,
      error: null,
    });
  const isOpen =
    !keywordsSearch.keywords?.length &&
    keywordsSearch.keywordsRanked?.length &&
    !isSearching;

  const onDownload = async () => {
    try {
      setDownloadRequestState({
        isLoading: true,
        error: null,
      });

      const keywordsResult = [...(keywordsSearch.keywordsRanked ?? [])];
      keywordsResult.reverse();

      const file = await postBuffer({
        url: "/export",
        body: {
          website: keywordsSearch.website,
          client: keywordsSearch.client,
          keywords: keywordsResult,
        },
      });
      const blob = new Blob([file.data as ArrayBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Reporte ${keywordsSearch.client}.xlsx`;
      link.click();

      URL.revokeObjectURL(url);
      reset();
    } catch (error) {
      setDownloadRequestState((prev) => ({
        ...prev,
        error: new Error(JSON.stringify(error)),
      }));
    } finally {
      setDownloadRequestState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.electron?.ipcRenderer?.send("focus-main-window");
    }
  }, [isOpen]);

  return {
    isOpen,
    onDecline: reset,
    onDownload,
    client: keywordsSearch.client,
    website: keywordsSearch.website,
    keywordsLength: keywordsSearch.keywordsRanked?.length ?? 0,
    ...downloadRequestState,
  };
}

export default usePendingExportController;
