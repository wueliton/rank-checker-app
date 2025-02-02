import useKeywordListTableController from "@controllers/useKeywordListTable";
import KeywordListItem from "../KeywordListItem";

function KeywordListTable() {
  const { tableData } = useKeywordListTableController();

  return (
    <table>
      <thead className="text-black/60 text-xs bg-slate-50 [&_th]:text-start sticky top-0">
        <tr>
          <th scope="col" className="p-4"></th>
          <th scope="col" className="p-4">
            Palavra-chave
          </th>
          <th scope="col" className="p-4">
            Página
          </th>
          <th scope="col" className="p-4">
            Posição
          </th>
          <th scope="col" className="p-4">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item, index) => (
          <KeywordListItem data={item} key={index} />
        ))}
      </tbody>
    </table>
  );
}

export default KeywordListTable;
