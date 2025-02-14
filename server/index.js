const http = require("http");
const { WebSocketServer } = require("ws");
const url = require("url");
const uuidv4 = require("uuid").v4;

const server = http.createServer();
const wsServer = new WebSocketServer({ server });

const connections = {};
const users = {};

const broadcast = () => {
  Object.keys(connections).forEach((uuid) => {
    const connection = connections[uuid];
    const message = JSON.stringify(users);
    connection.send(message);
  });
};

const handleMessage = (data, uuid) => {
  const message = JSON.parse(data.toString());
  users[uuid].state = message;
  broadcast();
  console.log(message);
};

wsServer.on("connection", (ws, request) => {
  const { username } = url.parse(request.url, true).query;
  const uuid = uuidv4();

  connections[uuid] = ws;
  users[uuid] = {
    username,
    state: {},
  };

  ws.on("message", (data) => handleMessage(data, uuid));
  ws.on("close", () => handleClose(uuid));

  console.log(username);
  console.log(uuid);
});

server.listen(8080, () => console.log("http://localhost:8080"));
