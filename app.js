require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const path = require("node:path");

const indexRouter = require("./routes/index");
const indecesRouter = require("./routes/indeces");
const securitiesRouter = require("./routes/securities");
const securityTypesRouter = require("./routes/securityTypes");

// set upt view engine ejs
app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/index", indecesRouter);
app.use("/security", securitiesRouter);
app.use("/security-type", securityTypesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

app.use((err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: "error",
    statusCode: statusCode,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});
