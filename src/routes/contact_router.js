const express = require("express");
const router = express.Router();
const upload = require("../helpers/upload");
const {
  getAllContacts,
  searchContact,
  addContact,
} = require("../controllers/controllers_contact");

router.get("/", upload.none(), getAllContacts);
router.get("/search", upload.none(), searchContact);
router.post("/:id", upload.none(), addContact);

module.exports = router;
