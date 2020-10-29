require("dotenv").config();
const sgMail = require("@sendgrid/mail");

const sendGridAPI = process.env.SEND_GRID_KEY;

sgMail.setApiKey(sendGridAPI);

const sendWelcome = (email, name) => {
  sgMail.send({
    to: email,
    from: process.env.DEV_EMAIL,
    subject: `Thanks for joining, ${name}!`,
    text: `Thanks for joining. ${name}, you're the best!`,
  });
};

const sendDepart = (email, name) => {
  sgMail.send({
    to: email,
    from: process.env.DEV_EMAIL,
    subject: `Au revoir, ${name}!`,
    text: `Thanks for leaving. ${name}, you're the worst!`,
  });
};

module.exports = { sendWelcome, sendDepart };
