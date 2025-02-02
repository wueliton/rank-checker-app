import Excel from "exceljs";

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
    data: (string | number)[],
    startCell: number = 0
  ) {
    if (!this.#worksheet) return;
    const row = this.#worksheet.getRow(rowNumber);
    data.forEach((cellContent, index) => {
      const cell = row.getCell(1 + startCell + index);
      cell.value = cellContent;
    });
    await row.commit();
  }

  getFile() {
    if (!this.#workbook) return;
    return this.#workbook.xlsx.writeBuffer();
  }
}

export default ExcelJsService;
