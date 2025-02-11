const http = require("http");
const { WebSocketServer } = require("ws");
const url = require("url");
const uuidv4 = require("uuid").v4;

const server = http.createServer();
const wsServer = new WebSocketServer({ server });

wsServer.on("connection", (ws, request) => {
  const { username } = url.parse(request.url, true).query;
  const uuid = uuidv4();

  console.log(username);
  console.log(uuid);
});

server.listen(8080, () => console.log("http://localhost:8080"));
