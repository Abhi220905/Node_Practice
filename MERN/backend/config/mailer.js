const transporter = require("nodemailer").createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendMailer(to, subject, html) {
  try {
    const options = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    };
    await transporter.sendMail(options, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = sendMailer;
