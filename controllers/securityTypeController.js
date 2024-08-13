const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const type = "security-type";

const getAllSecurityTypes = asyncHandler(async (req, res, next) => {
  const securityTypes = await db.getAllSecurityTypes();
  res.render("partials/listAll", { result: securityTypes, type: type });
});
const getSecurityTypeDetail = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const securityType = await db.getSecurityTypeDetail(id);
  res.render("partials/securityTypeDetail", {
    securityType: securityType[0],
    type: type,
  });
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
