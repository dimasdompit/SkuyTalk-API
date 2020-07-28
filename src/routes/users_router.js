const express = require("express");
const router = express.Router();
const upload = require("../helpers/upload");
const userControllers = require("../controllers/controllers_users");
const { verifyJwtToken } = require("../middleware/auth_middleware");

router.get("/", upload.none(), verifyJwtToken, userControllers.getAllUsers);
router.get("/:id", upload.none(), verifyJwtToken, userControllers.getUsersById);
router.post("/", upload.single("image"), userControllers.postUsers);
router.put(
  "/:id",
  upload.single("image"),
  verifyJwtToken,
  userControllers.putUsers
);

module.exports = router;
