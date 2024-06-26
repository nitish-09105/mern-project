const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controller");
const signupSchema=require("../validators/auth-validator")
const validate=require("../middlewares/validate-middleware")

// ? Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a "mini-app".

router.route("/").get(authcontrollers.home);

router.route("/register")
.post(validate(signupSchema), authcontrollers.register);

router.route("/login").post(authcontrollers.login);


module.exports = router;
