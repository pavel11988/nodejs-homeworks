"use strict";

var express = require("express");

var _require = require("../../middlewares"),
    ctrlWrapper = _require.ctrlWrapper,
    validation = _require.validation,
    authenticate = _require.authenticate,
    upload = _require.upload;

var ctrl = require("../../controllers/users");

var _require2 = require("../../schemas"),
    usersSchemas = _require2.usersSchemas;

var router = express.Router();
router.post("/signup", validation(usersSchemas.signupSchema), ctrlWrapper(ctrl.signup));
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.post("/verify", validation(usersSchemas.emailSchema), ctrlWrapper(ctrl.resendVerifyEmail));
router.post("/login", validation(usersSchemas.loginSchema), ctrlWrapper(ctrl.login));
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));
router.patch("/", authenticate, validation(usersSchemas.patchSchema), ctrlWrapper(ctrl.changeSubscription));
router.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));
module.exports = router;