const express = require("express");
const router = express.Router();
const upload = require("../helpers/upload");
const {
  getAllUsers,
  getUsersById,
  postUsers,
  putUsers,
  deleteUsersModel,
} = require("../controllers/controllers_users");
const { verifyJwtToken } = require("../middleware/auth_middleware");

router.get("/", upload.none(), verifyJwtToken, getAllUsers);
router.get("/:id", upload.none(), verifyJwtToken, getUsersById);
router.post("/", upload.single("image"), postUsers);
router.put("/:id", upload.single("image"), verifyJwtToken, putUsers);
router.delete("/:id", upload.none(), verifyJwtToken, deleteUsersModel);

module.exports = router;
