const signup = require("./signup");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const changeSubscription = require("./changeSubscription");
const updateAvatar = require("./updateAvatar");

module.exports = {
  signup,
  verifyEmail,
  resendVerifyEmail,
  login,
  getCurrent,
  logout,
  changeSubscription,
  updateAvatar,
};
