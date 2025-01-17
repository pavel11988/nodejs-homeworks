const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  console.log(result);
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

module.exports = getContactById;
