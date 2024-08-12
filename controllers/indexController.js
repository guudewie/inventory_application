const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getAllIndices = asyncHandler(async (req, res, next) => {
  res.send("Endpoint not available");
});
const getIndexDetail = asyncHandler(async (req, res, next) => {
  res.send("Endpoint not available");
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
