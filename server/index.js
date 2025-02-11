const http = require("http");
const { WebSocketServer } = require("ws");

const server = http.createServer();
const wsServer = new WebSocketServer({ server });

server.listen(8080, () => console.log("http://localhost:8080"));
