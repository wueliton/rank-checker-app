import useConectionLosedController from "@controllers/useConectionLosed";
import Dialog from "@presentation/components/Dialog";
import SpinIcon from "@presentation/components/Icons/SpinIcon";

function ConnectionLosedDialog() {
  const { isOpen } = useConectionLosedController();

  return (
    <Dialog isOpen={isOpen}>
      <Dialog.Icon>
        <SpinIcon className="animate-spin size-10 text-white/20 fill-white" />
      </Dialog.Icon>
      <Dialog.Content title="Conexão perdida">
        <p className="text-center text-black/60">
          Estamos tentando reconectar, aguarde...
        </p>
      </Dialog.Content>
    </Dialog>
  );
}

export default ConnectionLosedDialog;
