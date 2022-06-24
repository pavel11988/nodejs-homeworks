const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new NotFound("Not found");
  } else {
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  }
};

module.exports = updateContact;
