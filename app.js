const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const connection = require("./src/helpers/mysql");
const routes = require("./src/routes/main_routes");

const app = express();

connection.connect((error) => {
  if (error) throw error;
  console.log("Database Connected!");
});

app.use(express.static("assets"));

app.use(cors());
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", routes);

app.listen(3000, () => {
  console.log("Server running on port http://localhost:3000");
});
