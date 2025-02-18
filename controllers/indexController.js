const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const type = "index";

const getAllIndices = asyncHandler(async (req, res, next) => {
  const indices = await db.getAllIndices();
  res.render("partials/listAll", { result: indices, type: type });
});
const getIndexDetail = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const index = await db.getIndexDetail(id);
  res.render("partials/indexDetail", {
    index: index[0],
    type: type,
    modal: "hidden",
    errors: {},
  });
});
const getCreateForm = asyncHandler(async (req, res, next) => {
  const securities = await db.getAllSecurities();
  const securityTypes = await db.getAllSecurityTypes();
  res.render("partials/indexForm", {
    title: "Create Index",
    action: "/index/new",
    securities: securities,
    securityTypes: securityTypes,
    errors: {},
    formData: {},
  });
});
const createIndex = [
  body("ticker_symbol")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Please fill in this field.")
    .custom(async (value) => {
      const result = await db.getIndexTicker();
      return result.forEach((row) => {
        if (row.ticker_symbol == value) {
          throw new Error("Ticker is not unique");
        }
      });
    })
    .withMessage("Ticker Symbol has already been taken."),
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
  asyncHandler(async (req, res, next) => {
    const {
      name,
      ticker_symbol,
      description,
      selectedSecurities,
      securityType,
    } = req.body;
    const securities =
      selectedSecurities == "" ? [] : selectedSecurities.split(",");
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const securities = await db.getAllSecurities();
      const securityTypes = await db.getAllSecurityTypes();

      return res.status(400).render("partials/indexForm", {
        title: "Create Index",
        action: "/index/new",
        securities: securities,
        securityTypes: securityTypes,
        errors: errors.mapped(),
        formData: req.body,
      });
    }

    const newIndexId = await db.createIndex(
      name,
      description,
      ticker_symbol,
      securityType,
    );

    if (securities.length) {
      await Promise.all(
        securities.map((securityId) => {
          db.createIndexSecurity(securityId, newIndexId);
        }),
      );
    }
    res.redirect(`/index/${newIndexId}`);
  }),
];
const getUpdateForm = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const index = await db.getIndexInfoUpdate(id);
  const securities = await db.getAllSecurities();
  const securityTypes = await db.getAllSecurityTypes();

  res.render("partials/indexForm", {
    title: "Update Index",
    action: `/index/${id}/edit`,
    securities: securities,
    securityTypes: securityTypes,
    errors: {},
    formData: { ...index[0] },
  });
});
const updateIndex = [
  body("name").trim().notEmpty().withMessage("Please fill in this field."),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Please fill in this field."),
  body("ticker_symbol")
    .trim()
    .notEmpty()
    .withMessage("Please fill in this field.")
    .custom(
      asyncHandler(async (value, { req }) => {
        const currTicker = await db.getIndexDetail(req.params.id);
        if (value == currTicker[0].index_ticker) return true;

        const result = await db.getIndexTicker();
        const tickerArray = result.map((ticker) => ticker.ticker_symbol);

        if (tickerArray.includes(value)) {
          throw new Error("Ticker is not unique");
        }
      }),
    )
    .withMessage("Ticker Symbol has already been taken."),
  asyncHandler(async (req, res, next) => {
    const indexId = req.params.id;
    const {
      name,
      ticker_symbol,
      description,
      selectedSecurities,
      securityType,
    } = req.body;
    const securities =
      selectedSecurities == "" ? [] : selectedSecurities.split(",");
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const securities = await db.getAllSecurities();
      const securityTypes = await db.getAllSecurityTypes();

      return res.status(400).render("partials/indexForm", {
        title: "Update Index",
        action: `/index/${indexId}/edit`,
        securities: securities,
        securityTypes: securityTypes,
        errors: errors.mapped(),
        formData: req.body,
      });
    }

    // update index
    await db.updateIndex(
      indexId,
      name,
      description,
      ticker_symbol,
      securityType,
    );

    // update index security relations
    const securitiesOfIndex = await db.getSecuritiesOfIndex(indexId);
    const currentSecurityIds = securitiesOfIndex.map(
      (relation) => relation.security_id,
    );
    const newSecurityIds = securities.map((id) => Number(id));

    const currentSecuritySet = new Set(currentSecurityIds);
    const newSecuritySet = new Set(newSecurityIds);

    const idsToDelete = currentSecurityIds.filter(
      (id) => !newSecuritySet.has(id),
    );
    const idsToAdd = newSecurityIds.filter((id) => !currentSecuritySet.has(id));

    await Promise.all([
      ...idsToDelete.map((id) => db.deleteIndexSecurity(id, indexId)),
      ...idsToAdd.map((id) => db.createIndexSecurity(id, indexId)),
    ]);

    res.redirect(`/index/${indexId}`);
  }),
];

const getDeleteConfirmation = asyncHandler(async (req, res, next) => {
  const indexId = req.params.id;
  const index = await db.getIndexDetail(indexId);

  res.render("partials/indexDetail", {
    index: index[0],
    type: type,
    modal: "",
    errors: {},
  });
});

const deleteIndex = [
  body("password")
    .custom((value) => {
      if (value != process.env.DELETE_PASSWORD) {
        throw new Error("Incorrect Password");
      }
      return true;
    })
    .withMessage("Incorrect Password"),
  asyncHandler(async (req, res, next) => {
    const indexId = req.params.id;
    const index = await db.getIndexDetail(indexId);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("partials/indexDetail", {
        index: index[0],
        type: type,
        modal: "",
        errors: errors.mapped(),
      });
      return;
    }

    await db.deleteIndexSecurityofIndex(indexId);
    await db.deleteIndex(indexId);
    res.redirect("/index");
  }),
];

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
