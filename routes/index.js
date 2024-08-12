const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

// GET home page
router.get(
  "/",
  asyncHandler((req, res, next) => {
    res.render("test");
  }),
);
module.exports = router;
