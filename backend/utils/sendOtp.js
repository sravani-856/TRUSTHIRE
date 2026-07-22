const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendOtp = async (email, otp) => {
  await transporter.sendMail({
    from: `"TrustHire" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "TrustHire OTP Verification",
    text: `Your TrustHire OTP is ${otp}. It is valid for 5 minutes.`,
  });
};

module.exports = sendOtp;