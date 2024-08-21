const express = require("express");
const router = express.Router();
const security = require("../controllers/securityController");

/// CREATE SECURITY ///

// GET /new - Display create security form
router.get("/new", security.getCreateForm);

// POST /new - Process security creattion
router.post("/new", security.createSecurity);

/// GET SECURITY ///

// GET / - Get all securities
router.get("/", security.getAllSecurities);

// GET /:id - Get security detail
router.get("/:id", security.getSecurityDetail);

/// UPDATE SECURITY ///

// GET /:id/edit - Display update form
router.get("/:id/edit", security.getUpdateForm);

// PUT /:id - Process security update
router.post("/:id/edit", security.updateSecurity);

/// DELETE SECURITY ///

// GET /:id/delete - Display delete confirmation
router.get("/:id/delete", security.getDeleteConfirmation);

// DELETE /:id - Process security deletion
router.post("/:id/delete", security.deleteSecurity);

module.exports = router;
