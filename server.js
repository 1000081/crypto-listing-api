const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const cors = require("cors");
const connectDB = require("./server/database/connection");
const app = express();
const middleware = require("./middleware");

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

const corsOptions = {};

app.use(cors());
//app.use(cors({ origin: "https://cryptolisting.herokuapp.com" }));
// log requests
app.use(morgan("tiny"));

// mongodb connection
connectDB();

//disabled for testing purpose
app.use(middleware.decodeToken);

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// load routers
app.use("/", require("./server/routes/router"));
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
