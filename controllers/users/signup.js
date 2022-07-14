const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { sendMail } = require("../../helpers");
const { v4: uuidv4 } = require("uuid");

const { User } = require("../../models/user");
const { Conflict } = require("http-errors");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Verification your email.",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Click to verify your email.</a>`,
  };

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });

  await sendMail(mail);
};

module.exports = signup;
