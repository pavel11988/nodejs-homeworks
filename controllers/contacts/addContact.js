const schemas = require("../../schemas/contacts");
const contactsOperations = require("../../models/contacts");
const { createError } = require("../../helpers");

const addContact = async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing required name field");
    }
    const result = await contactsOperations.addContact(req.body);

    res.status(201);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
