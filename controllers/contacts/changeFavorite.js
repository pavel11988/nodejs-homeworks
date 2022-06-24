const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const changeFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
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

module.exports = changeFavorite;
