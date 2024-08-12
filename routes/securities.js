const express = require("express");
const router = express.Router();
const security = require("../controllers/securityController");

/// GET SECURITY ///

// GET / - Get all securities
router.get("/", security.getAllSecurities);

// GET /:id - Get security detail
router.get("/:id", security.getSecurityDetail);

/// CREATE SECURITY ///

// GET /new - Display create security form
router.get("/:id/new", security.getCreateForm);

// POST /new - Process security creattion
router.post("/:id/new", security.createSecurity);

/// UPDATE SECURITY ///

// GET /:id/edit - Display update form
router.get("/:id/edit", security.getUpdateForm);

// PUT /:id - Process security update
router.put("/:id", security.updateSecurity);

/// DELETE SECURITY ///

// GET /:id/delete - Display delete confirmation
router.get("/:id/delete", security.getDeleteConfirmation);

// DELETE /:id - Process security deletion
router.delete("/:id", security.deleteSecurity);