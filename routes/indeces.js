const express = require("express");
const router = express.Router();
const indices = require("../controllers/indexController");

/// GET INDICES ///

// GET /indices - Get all indices
router.get("/indices", indices.getAllIndices);

// GET /indices/:id - Get index detail
router.get("/indices/:id", indices.getIndexDetail);

/// CREATE INDICES ///

// GET /indices/new - Display create index form
router.get("/indices/:id/new", indices.getCreateForm);

// POST /indices/new - Process index creattion
router.post("/indices/:id/new", indices.createIndex);

/// UPDATE INDICES ///

// GET /indices/:id/edit - Display update form
router.get("/indices/:id/edit", indices.getUpdateForm);

// PUT /indices/:id - Process index update
router.put("/indices/:id", indices.updateIndex);

/// DELETE INDICES ///

// GET /indices/:id/delete - Display delete confirmation
router.get("/indices/:id/delete", indices.getDeleteConfirmation);

// DELETE /indices/:id - Process index deletion
router.delete("/indices/:id", indices.deleteIndex);
