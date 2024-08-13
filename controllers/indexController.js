const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getAllIndices = asyncHandler(async (req, res, next) => {
  const indices = await db.getAllIndices();
  res.render("partials/listAll", { result: indices });
});
const getIndexDetail = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const index = await db.getIndexDetail(id);
  res.render("partials/indexDetail", { index: index[0] });
});
const getCreateForm = asyncHandler(async (req, res, next) => {
  res.send("Endpoint not available");
});
const createIndex = asyncHandler(async (req, res, next) => {
  res.send("Endpoint not available");
});
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
