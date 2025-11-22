const nodemailer = require("nodemailer");

module.exports = async (to, subject, body, isHtml = false, attachments = []) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    [isHtml ? "html" : "text"]: body,
    attachments
  });
};

