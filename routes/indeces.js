const express = require("express");
const router = express.Router();
const indices = require("../controllers/indexController");

/// CREATE INDICES ///

// GET /new - Display create index form
router.get("/new", indices.getCreateForm);

// POST /new - Process index creattion
router.post("/new", indices.createIndex);

/// GET INDICES ///

// GET / - Get all indices
router.get("/", indices.getAllIndices);

// GET /:id - Get index detail
router.get("/:id", indices.getIndexDetail);

/// UPDATE INDICES ///

// GET /:id/edit - Display update form
router.get("/:id/edit", indices.getUpdateForm);

// POST /:id - Process index update
router.post("/:id/edit", indices.updateIndex);

/// DELETE INDICES ///
// GET /:id - Display delete confirmation
router.get("/:id/delete", indices.getDeleteConfirmation);

// DELETE /:id - Process index deletion
router.post("/:id/delete", indices.deleteIndex);

module.exports = router;
