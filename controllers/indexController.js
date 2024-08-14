const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const type = "index";

const getAllIndices = asyncHandler(async (req, res, next) => {
  const indices = await db.getAllIndices();
  res.render("partials/listAll", { result: indices, type: type });
});
const getIndexDetail = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const index = await db.getIndexDetail(id);
  res.render("partials/indexDetail", { index: index[0], type: type });
});
const getCreateForm = asyncHandler(async (req, res, next) => {
  const securities = await db.getAllSecurities();
  const securityTypes = await db.getAllSecurityTypes();
  res.render("partials/indexForm", {
    securities: securities,
    securityTypes: securityTypes,
  });
});
const createIndex = [
  body("name").trim().escape(),
  body("description").trim().escape(),
  body("ticker").trim().escape(),
  asyncHandler(async (req, res, next) => {
    const { name, ticker, description, selectedSecurities } = req.body;
    const securityTypeId = parseInt(req.body.securityType);
    const securities = selectedSecurities.split(",");

    const newIndexId = await db.createIndex(
      name,
      description,
      ticker,
      securityTypeId,
    );
    console.log(newIndexId);
    if (securities.length) {
      await Promise.all(
        securities.map((securityId) => {
          console.log("secuityId", securityId);
          console.log("IndexId", newIndexId);
          db.createIndexSecurity(securityId, newIndexId);
        }),
      );
    }
    res.redirect(`/index/${newIndexId}`);
  }),
];
const getUpdateForm = asyncHandler(async (req, res, next) => {
  res.send("Endpoint not available");
});
const updateIndex = asyncHandler(async (req, res, next) => {
  res.send("Endpoint not available");
});
const getDeleteConfirmation = asyncHandler(async (req, res, next) => {
  res.send("Endpoint not available");
});
const deleteIndex = asyncHandler(async (req, res, next) => {
  res.send("Endpoint not available");
});

module.exports = {
  getAllIndices,
  getIndexDetail,
  getCreateForm,
  createIndex,
  getUpdateForm,
  updateIndex,
  getDeleteConfirmation,
  deleteIndex,
};
