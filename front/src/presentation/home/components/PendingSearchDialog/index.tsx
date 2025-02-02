import usePendingSearchController from "@controllers/usePendingSearch";
import Button from "@components/Button";
import Dialog from "@components/Dialog";
import ContinueIcon from "@components/Icons/ContinueIcon";

function PendingSearchDialog() {
  const {
    hasPendingSearch,
    client,
    keywordsLength,
    website,
    onDecline,
    onContinueSearch,
  } = usePendingSearchController();

  if (!hasPendingSearch) return null;

  return (
    <Dialog isOpen>
      <Dialog.Icon>
        <ContinueIcon className="size-10" />
      </Dialog.Icon>
      <Dialog.Content title="Deseja continuar a busca?">
        <p className="text-black/60 text-center">
          Foi localizada uma busca não finalizada no histórico, deseja continuar
          a busca?
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
          Cancelar
        </Button>
        <Button onClick={onContinueSearch}>Continuar</Button>
      </Dialog.Actions>
    </Dialog>
  );
}

export default PendingSearchDialog;
