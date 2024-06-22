

const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controller");


// ? Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a "mini-app".

router.route("/").get(authcontrollers.home);

router.route("/register").post(authcontrollers.register);
router.route("/login").post(authcontrollers.login);

module.exports = router;
