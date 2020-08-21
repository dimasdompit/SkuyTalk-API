const express = require("express");
require("dotenv").config();
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const connection = require("./src/helpers/mysql");
const routes = require("./src/routes/main_routes");

connection.connect((error) => {
  if (error) throw error;
  console.log("Database Connected!");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat-message", (msg) => console.log(msg));
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use(express.static("assets"));

app.use(cors());
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((request, response, next) => {
  request.io = io;
  next();
});
app.use("/", routes);

server.listen(3000, () => {
  console.log("Server running on port http://localhost:3000");
});
