import useRecaptchaDialogController from "@controllers/useRecaptchaDialog";
import Dialog from "@presentation/components/Dialog";

function RecaptchaDialog() {
  const { canvasRef, isOpen } = useRecaptchaDialogController();

  return (
    <Dialog className="max-w-[840px] overflow-hidden" isOpen={isOpen}>
      <Dialog.Content title="Desafio recaptcha">
        <p className="text-center text-black/60">
          Solucione o desafio <strong>recaptcha</strong> para continuar:
        </p>
        <div className="overflow-auto">
          <canvas height={620} width={820} ref={canvasRef}></canvas>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}

export default RecaptchaDialog;
