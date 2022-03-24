const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const cors = require("cors");
const connectDB = require("./server/database/connection");
const app = express();
const middleware = require("./middleware");

app.use(cors());

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

//app.use(cors({ origin: process.env.ORIGIN_URL_ALLOWED }));
// log requests
app.use(morgan("tiny"));

// mongodb connection
connectDB();

//disabled for testing purpose
//app.use(middleware.decodeToken);

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// load routers
app.use("/", require("./server/routes/router"));
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
