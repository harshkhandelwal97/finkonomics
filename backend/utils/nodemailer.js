const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || '465', 10),
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
    secure: true,
})

/**
 * Send an email
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Plain text email content
 * @param {string} html - HTML email content (optional)
 */
const sendMail = async (to, subject, text, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_SUPPORT_ACCOUNT,
      to,
      subject,
      text,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error('Error sending email: ', error);
    throw error;
  }
};

module.exports = sendMail;
