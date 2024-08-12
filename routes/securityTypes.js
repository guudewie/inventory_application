const express = require("express");
const router = express.Router();
const securityType = require("../controllers/securityTypeController");

/// GET SECURITY TYPE ///

// GET / - Get all security types
router.get("/", securityType.getAllSecurityTypes);

// GET /:id - Get security type detail
router.get("/:id", securityType.getSecurityTypeDetail);

/// CREATE SECURITY TYPE ///

// GET /new - Display create security type form
router.get("/:id/new", securityType.getCreateForm);

// POST /new - Process security type creation
router.post("/:id/new", securityType.createSecurityType);

/// UPDATE SECURITY TYPE ///

// GET /:id/edit - Display update form
router.get("/:id/edit", securityType.getUpdateForm);

// PUT /:id - Process security type update
router.put("/:id", securityType.updateSecurityType);

/// DELETE SECURITY TYPE ///

// GET /:id/delete - Display delete confirmation
router.get("/:id/delete", securityType.getDeleteConfirmation);

// DELETE /:id - Process security type deletion
router.delete("/:id", securityType.deleteSecurityType);
