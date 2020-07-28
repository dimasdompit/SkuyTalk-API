const express = require("express");
const router = express.Router();
const upload = require("../helpers/upload");
const controllerContact = require("../controllers/controllers_contact");

router.get("/", upload.none(), controllerContact.getAllContacts);

module.exports = router;
