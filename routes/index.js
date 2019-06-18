const express = require("express");
const router = express.Router();
const PageController = require("./../controllers/page_controller");
const AuthenticationController = require("./../controllers/authentication_controller");
const { Joi, celebrate } = require("celebrate");

router.get("/", PageController.index);

router.get("/register", AuthenticationController.registerNew);

router.post("/register", celebrate({
    body: {
        email: Joi.string().required(),
        password: Joi.string().required()
    }
}), AuthenticationController.register);

router.get("/dashboard", PageController.dashboard);

module.exports = router;