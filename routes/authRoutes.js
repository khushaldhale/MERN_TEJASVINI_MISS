const express = require("express");
const { register, logout, login } = require("../controllers/auth");
const { authentication } = require("../middlewares/authentication");
const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.get("/logout", authentication, logout)

module.exports = router;