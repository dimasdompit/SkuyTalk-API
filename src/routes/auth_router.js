const express = require("express");
const router = express.Router();
const { login } = require("../controllers/controllers_auth");
const upload = require("../helpers/upload");

// router.post("/register", upload.single("image"), authController.register);
router.post("/login", upload.none(), login);

module.exports = router;
