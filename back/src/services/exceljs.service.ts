import Excel from "exceljs";
import { WriteReportProps } from "./exceljs.service.type";

class ExcelJsService {
  #workbook?: Excel.Workbook;
  #worksheet?: Excel.Worksheet;

  async init(filePath?: string) {
    this.#workbook = new Excel.Workbook();

    if (!filePath) return;

    await this.#workbook.xlsx.readFile(filePath);
  }

  selectWorksheet(worksheetIndex: number) {
    this.#worksheet = this.#workbook?.getWorksheet(worksheetIndex);
  }

  async addRow(
    rowNumber: number,
    data: Excel.CellValue[],
    startCell: number = 0
  ) {
    if (!this.#worksheet) return;
    const row = this.#worksheet.getRow(rowNumber);
    data.forEach((cellContent, index) => {
      const cell = row.getCell(1 + startCell + index);
      cell.value = cellContent;
      if (typeof cellContent === "object") {
        if ((cellContent as { hyperlink?: string }).hyperlink) {
          cell.font = {
            underline: true,
            color: { argb: "FF0000FF" },
          };
        }
      }
    });
    await row.commit();
  }

  async addMergedRow(footer: Excel.RichText[]) {
    const lastRow = this.#worksheet?.lastRow;
    if (!lastRow || !this.#worksheet) return;
    const lastRowNumber = lastRow.number + 1;
    const row = this.#worksheet.getRow(lastRowNumber);
    this.#worksheet.mergeCells(lastRowNumber, 1, lastRowNumber, 5);
    row.getCell(1).value = {
      richText: footer,
    };
    row.height = 80;
    row.getCell(1).alignment = {
      vertical: "top",
      horizontal: "left",
      wrapText: true,
    };

    await row.commit();
  }

  getFile() {
    if (!this.#workbook) return;
    return this.#workbook.xlsx.writeBuffer();
  }
}

export default ExcelJsService;
