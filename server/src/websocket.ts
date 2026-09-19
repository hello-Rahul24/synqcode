import { WebSocketServer, WebSocket } from "ws";

export function createWebSocketServer(port: number) {
  const wss = new WebSocketServer({ port });

  wss.on("connection", (socket: WebSocket) => {
    console.log("WebSocket client connected");

    socket.send(
      JSON.stringify({
        type: "WELCOME",
        message: "Connected to Synq"
      })
    );

    socket.on("message", (message) => {
      console.log("Received:", message.toString());

      socket.send(
        JSON.stringify({
          type: "MESSAGE",
          message: message.toString()
        })
      );
    });

    socket.on("close", () => {
      console.log("WebSocket client disconnected");
    });
  });

  console.log(`WebSocket server running on ws://localhost:${port}`);

  return wss;
}