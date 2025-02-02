import {
  EventType,
  Message,
  MessagesTypesEnum,
  OnReceiveMessage,
  SocketSendEventEnum,
} from "./websocket.service.type";
import { WebSocket } from "@fastify/websocket";

class WebSocketService {
  #connections: WebSocket[] = [];
  #onMessage?: OnReceiveMessage<Message<MessagesTypesEnum>>;

  addConnection(connection: WebSocket) {
    this.#connections.push(connection);
    connection.on("message", (data) =>
      this.#onMessage?.(JSON.parse(data.toString()))
    );
  }

  broadcastMessage<Event extends SocketSendEventEnum>(
    event: Event,
    data: EventType[Event]
  ) {
    this.#connections.forEach((connection) => {
      connection.send(JSON.stringify({ event, data }));
    });
  }

  removeConnection(connection: WebSocket) {
    this.#connections = this.#connections.filter((conn) => conn !== connection);
  }

  onMessage(callback: OnReceiveMessage<Message<MessagesTypesEnum>>) {
    this.#onMessage = callback;
  }
}

export default WebSocketService;
