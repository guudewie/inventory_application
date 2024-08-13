const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getAllSecurities = asyncHandler(async (req, res, next) => {
  const securities = await db.getAllSecurities();
  res.render("index/listAll", { result: securities });
});
const getSecurityDetail = asyncHandler(async (req, res, next) => {
  res.send("Endpoint not available");
});
const getCreateForm = asyncHandler(async (req, res, next) => {
  res.send("Endpoint not available");
});
const createSecurity = asyncHandler(async (req, res, next) => {
  res.send("Endpoint not available");
});
const getUpdateForm = asyncHandler(async (req, res, next) => {
  res.send("Endpoint not available");
});
const updateSecurity = asyncHandler(async (req, res, next) => {
  res.send("Endpoint not available");
});
const getDeleteConfirmation = asyncHandler(async (req, res, next) => {
  res.send("Endpoint not available");
});
const deleteSecurity = asyncHandler(async (req, res, next) => {
  res.send("Endpoint not available");
});

module.exports = {
  getAllSecurities,
  getSecurityDetail,
  getCreateForm,
  createSecurity,
  getUpdateForm,
  updateSecurity,
  getDeleteConfirmation,
  deleteSecurity,
};
