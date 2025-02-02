import useSearchFormController from "@controllers/useSearchForm";
import Button from "@components/Button";
import Input from "@components/Form/Input";
import TextArea from "@components/Form/TextArea";

function SearchForm() {
  const { control, isLoading, keywordsLength, onSubmit } =
    useSearchFormController();

  return (
    <>
      <h1 className="text-4xl font-bold">Nova busca</h1>

      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="flex-col md:flex-row flex gap-4">
          <Input control={control} name="client" label="Cliente" />
          <Input control={control} name="site" label="Site" />
        </div>
        <TextArea
          control={control}
          name="keywords"
          label="Palavras Chave"
          className="min-h-40"
          hint={
            <div>
              Palavras Chave: <strong>{keywordsLength}</strong>
            </div>
          }
        />
        <Button type="submit" isLoading={isLoading} disabled={isLoading}>
          Iniciar a busca
        </Button>
      </form>
    </>
  );
}

export default SearchForm;
