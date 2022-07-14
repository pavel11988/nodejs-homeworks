"use strict";

var _require = require("../../models/user"),
    User = _require.User;

var _require2 = require("http-errors"),
    NotFound = _require2.NotFound,
    BadRequest = _require2.BadRequest;

var _require3 = require("../../helpers"),
    sendMail = _require3.sendMail;

var resendVerifyEmail = function resendVerifyEmail(req, res) {
  var email, user, mail;
  return regeneratorRuntime.async(function resendVerifyEmail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          email = req.body.email;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 3:
          user = _context.sent;

          if (user) {
            _context.next = 6;
            break;
          }

          throw new NotFound("User not found");

        case 6:
          if (!user.verify) {
            _context.next = 8;
            break;
          }

          throw new BadRequest("Verification has already been passed");

        case 8:
          mail = {
            to: email,
            subject: "Verification your email.",
            html: "<a target=\"_blank\" href=\"http://localhost:3000/api/users/verify/".concat(user.verificationToken, "\">Click to verify your email.</a>")
          };
          _context.next = 11;
          return regeneratorRuntime.awrap(sendMail(mail));

        case 11:
          res.status(200).json({
            message: "Verification email sent"
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = resendVerifyEmail;