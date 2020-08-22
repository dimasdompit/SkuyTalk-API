const express = require("express");
const router = express.Router();
const upload = require("../helpers/upload");
const {
  showChats,
  getChatById,
  postChats,
  puChats,
  deleteChats,
} = require("../controllers/controllers_chat");
const { verifyJwtToken } = require("../middleware/auth_middleware");

router.get("/:id", upload.none(), showChats);
router.get("/", upload.none(), getChatById);
router.post("/:id", upload.none(), postChats);
router.put("/:id", upload.none(), puChats);
router.delete("/:id", upload.none(), deleteChats);

module.exports = router;
