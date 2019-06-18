const express = require("express");
const router = express.Router();
const PageController = require("./../controllers/page_controller");
const AuthenticationController = require("./../controllers/authentication_controller");
const { Joi, celebrate } = require("celebrate");
const { authRedirect, authorise } = require("./../middleware/authentication_middleware");

router.get("/", PageController.index);

router.get("/register", authRedirect, AuthenticationController.registerNew);

router.post("/register", celebrate({ // validate twice, this is the 1st validate, set at the layer from route to controller
    body: {
        email: Joi.string().required(),
        password: Joi.string().required()
    }
}), AuthenticationController.register);

router.get("/login", authRedirect, AuthenticationController.loginNew);
router.post("/login", AuthenticationController.login);

router.get("/logout", AuthenticationController.logout);

router.get("/dashboard", authorise, PageController.dashboard);

module.exports = router;