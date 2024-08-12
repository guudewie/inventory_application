const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getAllSecurities = asyncHandler(async (req, res, next) => {
  res.render("Endpoint not available");
});
const getSecurityDetail = asyncHandler(async (req, res, next) => {
  res.render("Endpoint not available");
});
const getCreateForm = asyncHandler(async (req, res, next) => {
  res.render("Endpoint not available");
});
const createSecurity = asyncHandler(async (req, res, next) => {
  res.render("Endpoint not available");
});
const getUpdateForm = asyncHandler(async (req, res, next) => {
  res.render("Endpoint not available");
});
const updateSecurity = asyncHandler(async (req, res, next) => {
  res.render("Endpoint not available");
});
const getDeleteConfirmation = asyncHandler(async (req, res, next) => {
  res.render("Endpoint not available");
});
const deleteSecurity = asyncHandler(async (req, res, next) => {
  res.render("Endpoint not available");
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
