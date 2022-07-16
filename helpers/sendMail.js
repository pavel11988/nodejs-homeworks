const sgMial = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMial.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
  const mail = { ...data, from: "moonte3003@gmail.com" };
  await sgMial.send(mail);
  return true;
};

module.exports = sendMail;

// sgMial
//   .send(mail)
//   .then(() => console.log("Mail send."))
//   .catch((error) => console.log(error.message));
