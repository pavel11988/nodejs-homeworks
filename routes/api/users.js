const express = require("express");
const {
  ctrlWrapper,
  validation,
  authenticate,
  upload,
} = require("../../middlewares");
const ctrl = require("../../controllers/users");
const { usersSchemas } = require("../../schemas");

const router = express.Router();

router.post(
  "/signup",
  validation(usersSchemas.signupSchema),
  ctrlWrapper(ctrl.signup)
);
router.post(
  "/login",
  validation(usersSchemas.loginSchema),
  ctrlWrapper(ctrl.login)
);
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));
router.patch(
  "/",
  authenticate,
  validation(usersSchemas.patchSchema),
  ctrlWrapper(ctrl.changeSubscription)
);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
