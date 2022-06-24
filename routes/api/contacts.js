const express = require("express");
const { ctrlWrapper, validation } = require("../../middlewares");
const {
  addSchema,
  updateSchema,
  patchSchema,
} = require("../../schemas/contacts");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));
router.get("/:contactId", ctrlWrapper(ctrl.getContactById));
router.post("/", validation(addSchema), ctrlWrapper(ctrl.addContact));
router.delete("/:contactId", ctrlWrapper(ctrl.deleteContact));
router.put(
  "/:contactId",
  validation(updateSchema),
  ctrlWrapper(ctrl.updateContact)
);
router.patch(
  "/:contactId/favorite",
  validation(patchSchema),
  ctrlWrapper(ctrl.changeFavorite)
);

module.exports = router;
