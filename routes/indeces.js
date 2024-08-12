const express = require("express");
const router = express.Router();
const indices = require("../controllers/indexController");

/// GET INDICES ///

// GET / - Get all indices
router.get("/", indices.getAllIndices);

// GET /:id - Get index detail
router.get("/:id", indices.getIndexDetail);

/// CREATE INDICES ///

// GET /new - Display create index form
router.get("/:id/new", indices.getCreateForm);

// POST /new - Process index creattion
router.post("/:id/new", indices.createIndex);

/// UPDATE INDICES ///

// GET /:id/edit - Display update form
router.get("/:id/edit", indices.getUpdateForm);

// PUT /:id - Process index update
router.put("/:id", indices.updateIndex);

/// DELETE INDICES ///

// GET /:id/delete - Display delete confirmation
router.get("/:id/delete", indices.getDeleteConfirmation);

// DELETE /:id - Process index deletion
router.delete("/:id", indices.deleteIndex);
