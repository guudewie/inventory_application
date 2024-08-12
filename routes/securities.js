const express = require("express");
const router = express.Router();
const indices = require("../controllers/indexController");

/// GET SECURITY ///

// GET / - Get all securities
router.get("/", indices.getAllSecurities);

// GET /:id - Get security detail
router.get("/:id", indices.getSecurityDetail);

/// CREATE SECURITY ///

// GET /new - Display create security form
router.get("/:id/new", indices.getCreateForm);

// POST /new - Process security creattion
router.post("/:id/new", indices.createSecurity);

/// UPDATE SECURITY ///

// GET /:id/edit - Display update form
router.get("/:id/edit", indices.getUpdateForm);

// PUT /:id - Process security update
router.put("/:id", indices.updateSecurity);

/// DELETE SECURITY ///

// GET /:id/delete - Display delete confirmation
router.get("/:id/delete", indices.getDeleteConfirmation);

// DELETE /:id - Process security deletion
router.delete("/:id", indices.deleteSecurity);
