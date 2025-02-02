import { FastifyInstance } from "fastify";
import WebSocketService from "../websockets/websocket.service";

class WebSocketRoutes {
  private webSocketService: WebSocketService;

  constructor(webSocketService: WebSocketService) {
    this.webSocketService = webSocketService;
  }

  public async registerRoutes(app: FastifyInstance) {
    const webSocketService = this.webSocketService;

    app.register(async function (fastify) {
      fastify.get("/", { websocket: true }, (connection, req) => {
        webSocketService.addConnection(connection);
      });
    });
  }
}

export default WebSocketRoutes;
