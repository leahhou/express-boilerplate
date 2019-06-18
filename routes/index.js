const express = require("express");
const router = express.Router();
const PageController = require("./../controllers/page_controller");
const AuthenticationController = require("./../controllers/authentication_controller");
const { Joi, celebrate } = require("celebrate");
const { authRedirect, authorise } = require("./../middleware/authentication_middleware");

router.get("/", PageController.index);

router.get("/register", authRedirect, AuthenticationController.registerNew);

router.post("/register", celebrate({
    body: {
        email: Joi.string().required(),
        password: Joi.string().required()
    }
}), AuthenticationController.register);

router.get("/logout", AuthenticationController.logout);

router.get("/dashboard", authorise, PageController.dashboard);

module.exports = router;