const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getAllSecurityTypes = asyncHandler(async (req, res, next) => {
  const securityTypes = await db.getAllSecurityTypes();
  res.render("index/listAll", { result: securityTypes });
});
const getSecurityTypeDetail = asyncHandler(async (req, res, next) => {
  res.send("Endpoint not available");
});
const getCreateForm = asyncHandler(async (req, res, next) => {
  res.send("Endpoint not available");
});
const createSecurityType = asyncHandler(async (req, res, next) => {
  res.send("Endpoint not available");
});
const getUpdateForm = asyncHandler(async (req, res, next) => {
  res.send("Endpoint not available");
});
const updateSecurityType = asyncHandler(async (req, res, next) => {
  res.send("Endpoint not available");
});
const getDeleteConfirmation = asyncHandler(async (req, res, next) => {
  res.send("Endpoint not available");
});
const deleteSecurityType = asyncHandler(async (req, res, next) => {
  res.send("Endpoint not available");
});

module.exports = {
  getAllSecurityTypes,
  getSecurityTypeDetail,
  getCreateForm,
  createSecurityType,
  getUpdateForm,
  updateSecurityType,
  getDeleteConfirmation,
  deleteSecurityType,
};
