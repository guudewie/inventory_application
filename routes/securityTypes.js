const express = require("express");
const router = express.Router();
const securityType = require("../controllers/securityTypeController");

/// CREATE SECURITY TYPE ///

// GET /new - Display create security type form
router.get("/new", securityType.getCreateForm);

// POST /new - Process security type creation
router.post("/new", securityType.createSecurityType);

/// GET SECURITY TYPE ///

// GET / - Get all security types
router.get("/", securityType.getAllSecurityTypes);

// GET /:id - Get security type detail
router.get("/:id", securityType.getSecurityTypeDetail);

/// UPDATE SECURITY TYPE ///

// GET /:id/edit - Display update form
router.get("/:id/edit", securityType.getUpdateForm);

// PUT /:id - Process security type update
router.post("/:id/edit", securityType.updateSecurityType);

/// DELETE SECURITY TYPE ///

// GET /:id/delete - Display delete confirmation
router.get("/:id/delete", securityType.getDeleteConfirmation);

// DELETE /:id - Process security type deletion
router.post("/:id/delete", securityType.deleteSecurityType);

module.exports = router;
