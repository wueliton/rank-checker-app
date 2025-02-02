import { FastifyInstance } from "fastify";
import ScrappingController from "../controllers/scrapping.controller";
import { SearchKeyword } from "../schemas/search-keyword.schema";
import { SearchKeywordType } from "../types/search-keyword.schema";
import { GenerateExcelType } from "../types/generate-excel.schema";
import GenerateExcelSchema from "../schemas/generate-excel.schema";
import GenerateExcelController from "../controllers/generate-excel.controller";

class AppRoutes {
  constructor(
    private scrappingController: ScrappingController,
    private generateExcelController: GenerateExcelController
  ) {}

  public async registerRoutes(app: FastifyInstance) {
    app.get("/status", (req, res) => {
      return res.send({ message: "Executando" });
    });

    app.post<{ Body: SearchKeywordType }>(
      "/search",
      {
        schema: {
          body: SearchKeyword,
        },
      },
      (req, res) => {
        try {
          const { site, keywords } = req.body;
          this.scrappingController.rankKeywords(site, keywords);
          res.send({ message: "Busca iniciada com sucesso" });
        } catch {
          res.status(400).send({
            message: "Existe uma busca em execução, aguarde a finalização",
          });
        }
      }
    );

    app.post<{ Body: GenerateExcelType }>(
      "/export",
      {
        schema: {
          body: GenerateExcelSchema,
        },
      },
      async (req, res) => {
        try {
          const file = await this.generateExcelController.exportReport(
            req.body
          );
          return res.send(file);
        } catch (error) {
          console.log({ error });
          res.status(403).send({
            message: "Erro ao tentar exportar",
            error: JSON.stringify(error),
          });
        }
      }
    );
  }
}

export default AppRoutes;
