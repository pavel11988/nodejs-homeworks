const express = require("express");
const { ctrlWrapper, validation, authenticate } = require("../../middlewares");

const { contactsSchemas } = require("../../schemas");

const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.listContacts));
router.get("/:contactId", ctrlWrapper(ctrl.getContactById));
router.post(
  "/",
  authenticate,
  validation(contactsSchemas.addSchema),
  ctrlWrapper(ctrl.addContact)
);
router.delete("/:contactId", ctrlWrapper(ctrl.deleteContact));
router.put(
  "/:contactId",
  validation(contactsSchemas.updateSchema),
  ctrlWrapper(ctrl.updateContact)
);
router.patch(
  "/:contactId/favorite",
  validation(contactsSchemas.patchSchema),
  ctrlWrapper(ctrl.changeFavorite)
);

module.exports = router;
