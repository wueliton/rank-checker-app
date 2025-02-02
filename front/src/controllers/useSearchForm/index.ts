import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { searchFormSchema } from "./schema";
import useKeywordsSearch from "@contexts/useKeywordsSearch";
import { SubmitKeywordsHandler } from "./types";
import useApi from "@services/api";

function useSearchFormController() {
  const { post } = useApi();
  const { startSearch } = useKeywordsSearch();
  const {
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(searchFormSchema),
  });
  const isLoading = isSubmitting || isSubmitSuccessful;
  const keywords = watch("keywords") ?? "";
  const keywordsLength = keywords
    .split(/\r?\n|\r|\n/g)
    .filter((el) => !!el).length;

  const onSubmit: SubmitHandler<SubmitKeywordsHandler> = async ({
    client,
    site,
    ...data
  }) => {
    try {
      const keywords = data.keywords
        .split(/\r?\n|\r|\n/g)
        .filter((keyword) => Boolean(keyword))
        .map((keyword) => keyword.trim());

      await post({
        url: "/search",
        body: {
          client,
          site,
          keywords,
        },
      });

      startSearch({ keywords, client, site });
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    control,
    onSubmit: handleSubmit(onSubmit),
    isLoading,
    keywordsLength,
  };
}

export default useSearchFormController;
