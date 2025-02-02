import SpinIcon from "@presentation/components/Icons/SpinIcon";
import { KeywordListItemProps } from "./types";
import useKeywordItemController from "@controllers/useKeywordItem";
import CancelIcon from "@presentation/components/Icons/CancelIcon";
import CheckIcon from "@presentation/components/Icons/CheckIcon";

function KeywordListItem({ data }: KeywordListItemProps) {
  const { item } = useKeywordItemController({ data });

  return (
    <tr className="border-b border-black/10 hover:bg-blue-50/40">
      <td className="p-4">
        {item.isLoading ? (
          <SpinIcon className="size-5 fill-blue-400 animate-spin text-black/10" />
        ) : item.founded ? (
          <CheckIcon className="size-5 text-green-600" />
        ) : (
          <CancelIcon className="size-5 text-red-500" />
        )}
      </td>
      <td className="p-4">{item.keyword}</td>
      <td className="p-4">{item.page ?? "-"}</td>
      <td className="p-4">{item.position ?? "-"}</td>
      <td className="p-4">{item.status}</td>
    </tr>
  );
}

export default KeywordListItem;
