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
  res.render("partials/securityDetail", { security: security[0], type: type });
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
    .escape()
    .isLength({ min: 1 })
    .withMessage("Please fill in this field."),
  body("description")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Please fill in this field."),
  body("ticker_symbol")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Please fill in this field.")
    .custom(async (value) => {
      const result = await db.getSecurityTicker();
      const tickerArray = result.map((ticker) => ticker.ticker_symbol);
      if (tickerArray.includes(value)) {
        throw new Error("Ticker is not unique");
      }
    })
    .withMessage("Ticker Symbol has already been taken."),
  asyncHandler(async (req, res, next) => {
    const { name, ticker_symbol, description } = req.body;
    const securityTypeId = parseInt(req.body.securityType);
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
      securityTypeId,
      ticker_symbol,
    );

    res.redirect(`/security/${newSecurityId}`);
  }),
];
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
