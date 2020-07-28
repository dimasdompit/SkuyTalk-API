const express = require("express");
const router = express.Router();
const authRouter = require("./auth_router");
const chatRouter = require("./chat_routes");
const usersRouter = require("./users_router");
const contactRouter = require("./contact_router");
const { verifyJwtToken } = require("../middleware/auth_middleware");

router.use("/auth", authRouter);
router.use("/chat", verifyJwtToken, chatRouter);
router.use("/users", usersRouter);
router.use("/contacts", verifyJwtToken, contactRouter);

module.exports = router;
