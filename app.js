require("dotenv").config();

// Node core modules
const path = require("path");

// Third-party modules
const express = require("express");
const bodyParser = require("body-parser");
// const expressHbs = require("express-handlebars");

// Local modules
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorsController = require("./controllers/errors");

// Create Express app instance
// and configure middleware
const app = express();
// app.engine(
//   "handlebars",
//   expressHbs({ defaultLayout: "main-layout", layoutsDir: "views/layouts" })
// );
app.set("view engine", "ejs");
app.set("views", "views"); // this is the default, doesn't need to be set explicitly

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

// 404 if none of the routes are hit
app.use(errorsController.notFound);

app.listen(3000);
