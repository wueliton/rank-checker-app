import moment from "moment";
import ExcelJsService from "../services/exceljs.service";
import { GenerateExcelType } from "../types/generate-excel.schema";
import path from "path";

class GenerateExcelController {
  #excelJsService: ExcelJsService;

  constructor(excelJsService: ExcelJsService) {
    this.#excelJsService = excelJsService;
  }

  async exportReport({ client, keywords }: GenerateExcelType) {
    const templatePath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "report.xlsx"
    );
    await this.#excelJsService.init(templatePath);
    this.#excelJsService.selectWorksheet(1);
    await this.#excelJsService.addRow(2, [`Relatório ${client}`]);
    await this.#excelJsService.addRow(3, [
      `Gerado em: ${moment().format("L")}`,
    ]);
    const firstPageKeywordsCount = keywords.filter(
      (keyword) => keyword.page === 1
    ).length;
    const amount = firstPageKeywordsCount * 50;
    const totalKeywords = keywords.length;
    const formatter = new Intl.NumberFormat("pt-BR", {
      currency: "BRL",
      style: "currency",
      minimumFractionDigits: 2,
      maximumFractionDigits: 3,
    });

    const orderedKeywords = keywords.sort((a, b) => {
      if (!a.page || !b.page) {
        return !a.page ? 1 : -1;
      }
      return a.page - b.page;
    });

    for (const [
      index,
      { keyword, page, link, position },
    ] of orderedKeywords.entries()) {
      await this.#excelJsService.addRow(8 + index, [
        index + 1,
        ...(link
          ? [
              {
                text: keyword ?? "-",
                hyperlink: link ?? "#",
              },
            ]
          : [keyword ?? "-"]),
        page ?? 0,
        position ?? 0,
        page ? "Encontrada" : "Não Encontrada",
      ]);
    }

    await this.#excelJsService.addMergedRow([
      {
        text: "Quantidade de palavras na primeira página = ",
      },
      {
        text: `${firstPageKeywordsCount} palavras `,
        font: {
          color: { argb: "ffff6347" },
          bold: true,
        },
      },
      {
        text: `de ${totalKeywords} contratadas \r\n\r\n`,
        font: {
          bold: true,
        },
      },
      {
        text: "TOTAL A PAGAR EM 00/00/0000: ",
        font: {
          bold: true,
        },
      },
      {
        text: `${firstPageKeywordsCount} palavras x R$ 50,00 `,
      },
      {
        text: `= ${formatter.format(amount)}`,
        font: {
          color: { argb: "ffff6347" },
          bold: true,
        },
      },
      ...(amount > 1000
        ? [
            {
              text: ", porém o valor\r\n\r\n",
              font: {
                color: { argb: "ffff6347" },
                bold: true,
              },
            },
            {
              text: "máximo do contrato é de R$ 1.000,00",
              font: {
                color: { argb: "ffff6347" },
                bold: true,
              },
            },
          ]
        : []),
    ]);

    return await this.#excelJsService.getFile();
  }
}

export default GenerateExcelController;
