import fastify from "fastify";
import fastifyWebsocket from "@fastify/websocket";
import WebSocketService from "./websockets/websocket.service";
import WebSocketRoutes from "./routes/websocket.routes";
import AppRoutes from "./routes/app.routes";
import ScrappingController from "./controllers/scrapping.controller";
import PlaywrightService from "./services/playwright.service";
import cors from "@fastify/cors";
import ExcelJsService from "./services/exceljs.service";
import GenerateExcelController from "./controllers/generate-excel.controller";

const app = fastify();

app.register(cors);

const webSocketService = new WebSocketService();
const webSocketRoutes = new WebSocketRoutes(webSocketService);

const excelJsService = new ExcelJsService();

app.register(fastifyWebsocket);
webSocketRoutes.registerRoutes(app);

const playrightService = new PlaywrightService();
const scrappingController = new ScrappingController(
  webSocketService,
  playrightService
);
const generateExcelController = new GenerateExcelController(excelJsService);
const appRoutes = new AppRoutes(scrappingController, generateExcelController);
appRoutes.registerRoutes(app);

app.listen({ port: 3000 }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  console.log(`Server is now listening on ${address}`);
});
