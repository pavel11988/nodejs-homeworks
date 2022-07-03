const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { User } = require("../models/user");

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers; // = "" - in case there is undefined
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw new Unauthorized();
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) {
        throw new Unauthorized();
      }
      req.user = user;
      next();
    } catch (error) {
      error.status = 401;
      error.message = "Not authorized";
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
