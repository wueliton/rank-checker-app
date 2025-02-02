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

    for (const [index, { keyword, page, position }] of keywords.entries()) {
      await this.#excelJsService.addRow(8 + index, [
        index + 1,
        keyword ?? "-",
        page ?? 0,
        position ?? 0,
        page ? "Encontrada" : "Não Encontrada",
      ]);
    }

    return await this.#excelJsService.getFile();
  }
}

export default GenerateExcelController;
