const express = require("express");
const router = express.Router();
const upload = require("../helpers/upload");
const chatControllers = require("../controllers/controllers_chat");

router.get("/:id", upload.none(), chatControllers.showChats);
router.get("/", upload.none(), chatControllers.getChatById);
router.post("/", upload.none(), chatControllers.postChats);
router.put("/:id", upload.none(), chatControllers.puChats);
router.delete("/:id", upload.none(), chatControllers.deleteChats);

module.exports = router;
