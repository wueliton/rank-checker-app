import usePendingExportController from "@controllers/usePendingExport";
import Button from "@presentation/components/Button";
import Dialog from "@presentation/components/Dialog";
import DownloadFileIcon from "@presentation/components/Icons/DownloadFileIcon";

function PendingExportDialog() {
  const {
    isOpen,
    onDecline,
    onDownload,
    isLoading,
    client,
    keywordsLength,
    website,
  } = usePendingExportController();

  if (!isOpen) return null;

  return (
    <Dialog isOpen>
      <Dialog.Icon>
        <DownloadFileIcon className="size-10" />
      </Dialog.Icon>
      <Dialog.Content title="Relatório">
        <p className="text-black/60 text-center">
          Seu relatório está pronto, deseja baixar?
        </p>
        <div className="bg-gray-50 rounded-md p-3 w-full mt-2">
          <p>
            <strong>Cliente</strong>: {client}
          </p>
          <p>
            <strong>Website</strong>: {website}
          </p>
          <p>
            <strong>Palavras Restantes</strong>: {keywordsLength}
          </p>
        </div>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onClick={onDecline} variant="ghost">
          Descartar
        </Button>
        <Button onClick={onDownload} isLoading={isLoading}>
          Baixar
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
}

export default PendingExportDialog;
