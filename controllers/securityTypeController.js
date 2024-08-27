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
    modal: "hidden",
    errors: {},
    linkedItems: [],
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
  const id = req.params.id;
  const securityType = await db.getSecurityTypeInfoUpdate(id);

  res.render("partials/securityTypeForm", {
    title: "Update Security Type",
    action: `/security-type/${id}/edit`,
    errors: {},
    formData: { ...securityType[0] },
  });
});
const updateSecurityType = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Please fill in this field.")
    .custom(async (value, { req }) => {
      const currName = await db.getSecurityTypeDetail(req.params.id);
      if (value == currName[0].name) return true;

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
    const id = req.params.id;
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

    await db.updateSecurityType(id, name, description);

    res.redirect(`/security-type/${id}`);
  }),
];
const getDeleteConfirmation = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const securitiesType = await db.getSecurityTypeDetail(id);
  const linkedItems = await db.getSecuritiesAndIndexWithType(id);

  res.render("partials/securityTypeDetail", {
    securityType: securitiesType[0],
    type: type,
    modal: "",
    errors: {},
    linkedItems: linkedItems,
  });
});
const deleteSecurityType = [
  body("password")
    .custom((value) => {
      if (value != process.env.DELETE_PASSWORD) {
        throw new Error("Incorrect Password");
      }
      return true;
    })
    .withMessage("Incorrect Password"),
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const securitiesType = await db.getSecurityTypeDetail(id);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("partials/securityTypeDetail", {
        securityType: securitiesType[0],
        type: type,
        modal: "",
        errors: errors.mapped(),
        linkedItems: [],
      });
    }

    await db.deleteSecurityType(id);
    res.redirect("/index");
  }),
];

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
