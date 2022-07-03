const { User } = require("../../models/user");

const changeSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  await User.findByIdAndUpdate(_id, { subscription: subscription });

  const user = await User.findOne({ _id });
  res.status(200).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = changeSubscription;
