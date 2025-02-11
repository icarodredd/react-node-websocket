const http = require("http");
const { WebSocketServer } = require("ws");
const url = require("url");

const server = http.createServer();
const wsServer = new WebSocketServer({ server });

wsServer.on("connection", (ws, request) => {
  const { username } = url.parse(request.url, true).query;
  console.log(username);
});

server.listen(8080, () => console.log("http://localhost:8080"));
