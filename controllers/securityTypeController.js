const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

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
  res.render("partials/securityTypeForm", {
    title: "Create Security Type",
    action: "/security-type/new",
    errors: {},
    formData: {},
  });
});
const createSecurityType = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Please fill in this field.")
    .custom(async (value) => {
      const result = await db.getSecurityTypeName();
      return result.forEach((row) => {
        if (row.name == value) {
          throw new Error("Name is not unique");
        }
      });
    })
    .withMessage("This type already exists."),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Please fill in this field."),
  asyncHandler(async (req, res, next) => {
    const { name, description } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("partials/securityTypeForm", {
        title: "Create Security Type",
        action: "/security-type/new",
        errors: errors.mapped(),
        formData: req.body,
      });
    }

    const newSecurityTypeId = await db.createSecurityType(name, description);

    res.redirect(`/security-type/${newSecurityTypeId}`);
  }),
];
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
