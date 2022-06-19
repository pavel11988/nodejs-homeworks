const schemas = require("../../schemas/contacts");

const { createError } = require("../../helpers");
const contactsOperations = require("../../models/contacts");

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;
    const { error } = schemas.updateSchema.validate(body);
    if (error) {
      throw createError(400, "missing fields");
    }
    const result = await contactsOperations.updateContact(contactId, body);

    if (!result) {
      throw createError(404, "Not Found");
    }

    res.status(200).json({
      message: "Contact updated",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
