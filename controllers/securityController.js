const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const type = "security";

const getAllSecurities = asyncHandler(async (req, res, next) => {
  const securities = await db.getAllSecurities();
  res.render("partials/listAll", { result: securities, type: type });
});
const getSecurityDetail = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const security = await db.getSecurityDetail(id);
  res.render("partials/securityDetail", {
    security: security[0],
    type: type,
    modal: "hidden",
    errors: {},
  });
});
const getCreateForm = asyncHandler(async (req, res, next) => {
  const securityTypes = await db.getAllSecurityTypes();
  res.render("partials/securityForm", {
    title: "Create Security",
    action: "/security/new",
    securityTypes: securityTypes,
    errors: {},
    formData: {},
  });
});
const createSecurity = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please fill in this field."),
  body("description")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please fill in this field."),
  body("ticker_symbol")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please fill in this field.")
    .custom(async (value) => {
      const result = await db.getSecurityTicker();
      return result.forEach((row) => {
        if (row.ticker_symbol == value) {
          throw new Error("Ticker is not unique");
        }
      });
    })
    .withMessage("Ticker Symbol has already been taken."),
  asyncHandler(async (req, res, next) => {
    const { name, ticker_symbol, description, securityType } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const securityTypes = await db.getAllSecurityTypes();

      return res.status(400).render("partials/securityForm", {
        title: "Create Security",
        action: "/security/new",
        securityTypes: securityTypes,
        errors: errors.mapped(),
        formData: req.body,
      });
    }

    const newSecurityId = await db.createSecurity(
      name,
      description,
      securityType,
      ticker_symbol,
    );

    res.redirect(`/security/${newSecurityId}`);
  }),
];
const getUpdateForm = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const security = await db.getSecurityInfoUpdate(id);
  const securityTypes = await db.getAllSecurityTypes();

  res.render("partials/securityForm", {
    title: "Update Security",
    action: `/security/${id}/edit`,
    securityTypes: securityTypes,
    errors: {},
    formData: { ...security[0] },
  });
});
const updateSecurity = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please fill in this field."),
  body("description")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please fill in this field."),
  body("ticker_symbol")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please fill in this field.")
    .custom(async (value, { req }) => {
      const currTicker = await db.getSecurityDetail(req.params.id);
      if (value == currTicker[0].security_ticker) return true;

      const result = await db.getSecurityTicker();
      return result.forEach((row) => {
        if (row.ticker_symbol == value) {
          throw new Error("Ticker is not unique");
        }
      });
    })
    .withMessage("Ticker Symbol has already been taken."),
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const { name, ticker_symbol, description, securityType } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const securityTypes = await db.getAllSecurityTypes();

      return res.status(400).render("partials/securityForm", {
        title: "Update Security",
        action: `/security/${id}/edit`,
        securityTypes: securityTypes,
        errors: errors.mapped(),
        formData: req.body,
      });
    }

    // update index
    await db.updateSecurity(id, name, description, ticker_symbol, securityType);

    res.redirect(`/security/${id}`);
  }),
];

const getDeleteConfirmation = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const security = await db.getSecurityDetail(id);

  res.render("partials/securityDetail", {
    security: security[0],
    type: type,
    modal: "",
    errors: {},
  });
});
const deleteSecurity = [
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
    const security = await db.getSecurityDetail(id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("partials/securityDetail", {
        security: security[0],
        type: type,
        modal: "",
        errors: errors.mapped(),
      });
    }

    await db.deleteIndexSecurityofSecurity(id);
    await db.deleteSecurity(id);
    res.redirect("/security");
  }),
];

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
