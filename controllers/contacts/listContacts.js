const { Contact } = require("../../models");

const listContacts = async (req, res, next) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  let result;
  if (favorite === undefined) {
    result = await Contact.find({ owner }, "-createdAt -updateedAt", {
      skip,
      limit: Number(limit),
    }).populate("owner", "email subscription");
  } else {
    result = await Contact.find({ owner }, "-createdAt -updateedAt", {
      skip,
      limit: Number(limit),
    })
      .populate("owner", "email subscription")
      .where("favorite")
      .equals(favorite);
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = listContacts;
