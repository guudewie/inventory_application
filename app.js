require("dotenv").config();

const express = require("express");
const app = express();

const indexRouter = require("./routes/index");
const indecesRouter = require("./routes/indeces");
const securitiesRouter = require("./routes/securities");
const securityTypesRouter = require("./routes/securityTypes");

app.use("/", indexRouter);
app.use("/index", indecesRouter);
app.use("/security", securitiesRouter);
app.use("/securityType", securityTypesRouter);

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
